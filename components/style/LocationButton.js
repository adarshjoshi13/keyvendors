import { useState, useRef, useEffect, useCallback, useMemo, useNavigate, useLocation } from "react";
import AddLocationOutlinedIcon from "@mui/icons-material/AddLocationOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import PinDropIcon from "@mui/icons-material/PinDrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Card, CardMedia, CardContent, Typography} from "@mui/material";
import GoogleLocationSearch from "components/style/GoogleLocationSearch";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import IconContent from "components/style/IconContent";
import PopperContent from "components/style/PopperContent";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, fetchDataWithUrl } from "services/api";
import { configLocation, getLocation } from "store/locationSlice";
import { getCoordinates } from "utils/location";
import DialogBox from "./DialogBox";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function LocationButton({ hideButton, opendilog }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [locationDisplayName, setLocationDisplayName] = useState(null);
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

    if (opendilog) {
      dispatch(
        configLocation({ locality: city.slug, ...city})
      );
      const path = window.location.pathname;
      const segments = path.split("/"); 
      const [lastTwoParams1, lastTwoParams2] = segments.slice(-2);
      window.location.href = `/service/${city.slug}/${lastTwoParams1}/${lastTwoParams2}`;
      return {
        redirect: {
          destination: `/service/${city.slug}/${lastTwoParams1}/${lastTwoParams2}`,
          permanent: true,
        },
      };
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
          let postal_code = res.data.data.address.postcode;
          let resCity = await fetchData(`location/city`, {
            pincode: postal_code,
          });

          let location = { ...resCity.data, ...res.data.data };
          // console.log(location,'location');
          
          const locality = !location.address
            ? { ...location, locality: location.display_name }
            : location.address;
          dispatch(configLocation({ ...location, ...locality }));

          setLocationDisplayName(location.display_name);
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
                if (!open) {
                  handleClick("bottom-start");
                }
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
      <Grid direction="column" textAlign="center" container >
        <Grid item>
          <IconContent
            content="Please provide your location for best experience"
            icon={<AddLocationOutlinedIcon />}
          />
        </Grid>
        <Grid item>
          <IconContent
            // dividerText="Or"
            content="Detect My Location"
            sx={{ color: "red" }}
            clickHandle={() => getCoordinates(handleLocation)}
            icon={<MyLocationOutlinedIcon sx={{ color: "red" }} />}
          />
        </Grid>
        {/* <Grid item>
          <IconContent
            content={<GoogleLocationSearch handleClose={handleClick} />}
            isDividerOff={true}
          />
        </Grid> */}
        <Box>{locationDisplayName ? locationDisplayName : ""}</Box>
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
        handleClose={() => setCityDialogOpen(false)}
        open={cityDialogOpen}
        title={"Please Select your Service Area."}
        fullWidth // Ensures the dialog uses full width on small screens
        maxWidth="md" // Limits the dialog width on larger screens
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={3} // Adjust spacing between cards
        >
          {cities.map((city, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  textAlign: "center",
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)", // Hover effect
                  },
                }}
              >
                <CardContent>
                  {/* SVG */}
                  <Box
                    sx={{
                      display: "block",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      style={{
                        maxWidth: "40%",
                        maxHeight: "40%",
                        fill: "#1976d2", // Adjust the color of the SVG here
                      }}
                    >
                      <path d="M616 192H480V24c0-13.3-10.7-24-24-24H312c-13.3 0-24 10.7-24 24v72h-64V16c0-8.8-7.2-16-16-16h-16c-8.8 0-16 7.2-16 16v80h-64V16c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16v80H24c-13.3 0-24 10.7-24 24v360c0 17.7 14.3 32 32 32h576c17.7 0 32-14.3 32-32V216c0-13.3-10.8-24-24-24zM128 404c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm128 192c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm160 96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm160 288c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z" />
                    </svg>
                  </Box>

                  {/* Button */}
                  <Box
                    sx={{
                      display: "block",
                      marginTop: 1,
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleCitySelect(city)}
                      sx={{
                        fontSize: "10px",
                        borderRadius: 50,
                        borderColor: "#1976d2",
                        fontWeight: "bold",
                      }}
                    >
                      {city.title}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogBox>
    </>
  );
}
