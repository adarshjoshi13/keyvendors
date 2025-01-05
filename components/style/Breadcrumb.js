import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import LocationButton from "components/style/LocationButton";
import { useSelector } from "react-redux";
import { getLocation } from "store/locationSlice";

export default function Breadcrumb({title}) {
  const location=useSelector(getLocation);
  return (
    <Grid sx={{ p: 2 }} container direction={"row"}>
      <Grid xs={6} justifyContent="flex-start" container item>
        <Box role="presentation" >
          <Breadcrumbs aria-label="breadcrumb">
            <Link  href="/" underline="hover" color="inherit">
              Home
            </Link>
            <Link underline="hover" color="inherit" href={`/${location?location.slug:"delhi"}`}>
            {location?location.locality:"Delhi/NCR"}
            </Link>
            <Typography color="text.primary">{title}</Typography>
          </Breadcrumbs>
        </Box>
      </Grid>
      <Grid xs={6} justifyContent="flex-end" container  item>
        <LocationButton opendilog={true} />
      </Grid>
    </Grid>
  );
}
