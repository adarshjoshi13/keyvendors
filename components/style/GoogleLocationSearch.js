import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { InputAdornment } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { debounce } from "@mui/material/utils";
import parse from "autosuggest-highlight/parse";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { fetchDataWithUrl, fetchData } from "services/api";
import { configLocation } from "store/locationSlice";
import { useDispatch } from "react-redux";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  width: 300,
  "& + .MuiAutocomplete-popper": {
    zIndex: "0 !important",
    position: "relative !important",
    height: "auto !important",
  },

  "& + .MuiAutocomplete-popper .MuiAutocomplete-loading": {
    color: "blue",
    margin: 5,
    fontSize: 12,
    border: "1px solid red",
  },
}));

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

export default function GoogleLocationSearch({ handleClose }) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const loaded = useRef(false);
  const dispatch = useDispatch();

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&&callback=`,
        document.querySelector("head"),
        "google-maps"
      );
    }
    loaded.current = true;
  }

  const fetch = useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    []
  );

  useEffect(() => {
    // if (value) {
    //   (async () => {
    //     let res = await fetchDataWithUrl(
    //       `${process.env.HOST}/api/location-place/places`,
    //       { params: { place_id:  } }
    //     );
    //     if (handleClose) {
    //       handleClose("bottom-start");
    //     }
    //     let loc = res.data?.data?.location;
    //     let postal_code = res.data?.data?.postal_code;

    //     if (!postal_code) {
    //       let res = await fetchDataWithUrl(
    //         `${process.env.HOST}/api/location-page/all`,
    //         {
    //           params: { lat: loc?.lat, lon: loc?.lng },
    //         }
    //       );
    //       postal_code = res?.data?.data?.postal_code;
    //     }

    //     let resCity = await fetchData(`location/city`, {
    //       pincode: postal_code,
    //     });
    //     let locationObj = { ...res.data.data, ...resCity.data };
    //     dispatch(configLocation(locationObj));
    //   })();
    // }
    // value;
    // inputValue;
    // let locationObj = { value, inputValue };
    // dispatch(configLocation(locationObj))
  }, [value, dispatch]);

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch(
      { input: inputValue, componentRestrictions: { country: "in" } },
      (results) => {
        if (active) {
          let newOptions = [];
          if (value) {
            newOptions = [value];
          }
          if (results) {
            newOptions = [...newOptions, ...results];
          }
          setOptions(newOptions);
        }
      }
    );

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <>
      <StyledAutocomplete
        loading={true}
        loadingText={value ? "Loading..." : "Please enter your location"}
        size="small"
        disablePortal={true}
        ListboxProps={{
          sx: {
            overflow: "hidden",
          },
        }}
        componentsProps={{
          popper: {
            id: "location-search-popper",
            disablePortal: true,
            transition: true,
          },
          paper: {
            sx: {
              boxShadow: "none",
            },
          },
        }}
        forcePopupIcon={false}
        id="location-search"
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.description
        }
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        noOptionsText="Please enter your location"
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search location"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <LocationSearchingIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        )}
        renderOption={(props, option) => {
          const matches =
            option.structured_formatting.main_text_matched_substrings || [];

          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match) => [match.offset, match.offset + match.length])
          );

          return (
            <Box component="li" {...props}>
              <Grid
                sx={{ fontSize: 12, borderBottom: "1px dotted grey" }}
                container>
                <Grid item sx={{ display: "flex", width: 44 }}>
                  <LocationOnIcon
                    sx={{ color: "text.secondary" }}
                    size="small"
                  />
                </Grid>
                <Grid
                  item
                  sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}>
                  {parts.map((part, index) => (
                    <Box
                      key={index}
                      component="span"
                      sx={{ fontWeight: part.highlight ? "bold" : "regular" }}>
                      {part.text}
                    </Box>
                  ))}
                  <Typography variant="body2" color="text.secondary">
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          );
        }}
      />
      <Autocomplete
        renderInput={(params) => (
          inputValue ? (
                    <Typography variant="body1">Location selected: {inputValue}</Typography>
          ) : (null)
        )}
      />
    </>
  );
}
