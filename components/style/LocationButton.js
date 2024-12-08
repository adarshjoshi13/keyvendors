import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import AddLocationOutlinedIcon from "@mui/icons-material/AddLocationOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import PinDropIcon from "@mui/icons-material/PinDrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import GoogleLocationSearch from "components/style/GoogleLocationSearch";
import IconContent from "components/style/IconContent";
import PopperContent from "components/style/PopperContent";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, fetchDataWithUrl } from "services/api";
import { configLocation, getLocation } from "store/locationSlice";
import { getCoordinates } from "utils/location";
import DialogBox from "./DialogBox";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function LocationButton({ hideButton }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useSelector(getLocation);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("bottom-start");
  const locationButtonRef = useRef(null);
  const [cities, setCities] = useState([]);
  const router = useRouter();
  const [cityDialogOpen, setCityDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { data: resCities } = useSWR(`location/cities`, fetchData, {
    revalidateOnFocus: true,
  });

  const handleCitySelect = (city) => {
    const locality = !location.locality
      ? { ...location, locality: location.title }
      : location.locality;

    dispatch(configLocation({ ...location, ...city, ...locality }));
    setCityDialogOpen(false);
    if (open) {
      handleClick("bottom-start");
    }
  };

  const handleClick = useCallback(
    (newPlacement = "bottom-start") => {
      setAnchorEl(locationButtonRef.current);
      setPlacement(newPlacement);
      setOpen((prev) => newPlacement !== placement || !prev); // Fix: Directly compare newPlacement
    },
    [placement]
  );

  const handleLocation = useCallback(
    async (loc) => {
      try {
        let res = await fetchDataWithUrl(
          `${process.env.HOST}/api/location/cordetails`,
          {
            params: { lat: loc[0], lon: loc[1] },
          }
        );
        if (res.status === 200) {
          let postal_code = res.data.data.postal_code;
          let resCity = await fetchData(`location/city`, {
            pincode: postal_code,
          });

          let location = { ...resCity.data, ...res.data.data };
          const locality = !location.locality
            ? { ...location, locality: location.title }
            : location.locality;

          dispatch(configLocation({ ...location, ...locality }));
        }
      } catch (error) {
        console.error(error);
      }
      if (open) {
        handleClick("bottom-start");
      }
    },
    [dispatch, handleClick, open]
  );

  const selectedCity = useMemo(
    () =>
      resCities
        ? resCities.data.filter(
            (city) =>
              city.slug === router.asPath.substring(1, router.asPath.length)
          )
        : [],
    [resCities, router.asPath]
  );

  useEffect(() => {
    if (!location && router.pathname === "/" && selectedCity.length > 0) {
      dispatch(
        configLocation({ locality: selectedCity[0].title, ...selectedCity[0] })
      );
      // if (!open) {
      //   handleClick("bottom-start");
      // }
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedCity.length === 0) {
      if (!location) {
        try {
          navigator.permissions
            .query({ name: "geolocation" })
            .then((permissionStatus) => {
              if (permissionStatus.state === "granted") {
                getCoordinates(handleLocation);
              } else {
                // if (!open) {
                //   handleClick("bottom-start");
                // }
              }
            });
        } catch (error) {
          console.log(error);
        }
      } else {
        if ((!location.city_id || !location.locality) && resCities) {
          setCities(resCities.data);
          setCityDialogOpen(true);
        }
      }
    }
  }, [location, open, handleClick, handleLocation, resCities, selectedCity]);

  const LocationGrid = ({ handleLocation, handleClick }) => {
    return (
      <Grid direction="column" textAlign="center" container>
        <Grid item>
          <IconContent
            content="Please provide your location for best experience"
            icon={<AddLocationOutlinedIcon />}
          />
        </Grid>
        <Grid item>
          <IconContent
            dividerText="Or"
            content="Detect My Location"
            sx={{ color: "red" }}
            clickHandle={() => getCoordinates(handleLocation)}
            icon={<MyLocationOutlinedIcon sx={{ color: "red" }} />}
          />
        </Grid>
        <Grid item>
          <IconContent
            content={<GoogleLocationSearch handleClose={handleClick} />}
            isDividerOff={true}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      {!hideButton && (
        <>
          <Button
            ref={locationButtonRef}
            sx={{ textTransform: "none", color: "black" }}
            endIcon={<KeyboardArrowDownIcon />}
            startIcon={<PinDropIcon />}
            onClick={() => handleClick("bottom-start")}>
            <Box>{location ? location.locality : "Delhi/NCR"}</Box>
          </Button>
          <PopperContent open={open} anchorEl={anchorEl} placement={placement}>
            <LocationGrid
              handleLocation={handleLocation}
              handleClick={handleClick}
            />
          </PopperContent>
        </>
      )}
      {hideButton && (
        <LocationGrid
          handleLocation={handleLocation}
          handleClick={handleClick}
        />
      )}

      <DialogBox
        handleClose={() => setCityDialogOpen(true)}
        open={cityDialogOpen}
        title={"Please Select your Service area."}>
        <Grid
          justifyContent={"center"}
          alignItems={"center"}
          direction={"row"}
          spacing={6}
          container>
          {cities.map((city, index) => (
            <Grid key={index} lg={4} item>
              <Button variant="outlined" onClick={() => handleCitySelect(city)}>
                {city.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </DialogBox>
    </>
  );
}
