import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import completedIcon from "public/assets/completedIcon.png";
import requestIcon from "public/assets/requestIcon.png";
import satisfiedIcon from "public/assets/satisfiedIcon.png";
import customersIcon from "public/assets/customersIcon.png";
import Image from "next/image";
import Box from "@mui/material/Box";
export default function NotificationRibbon() {
  return (
    <Grid
      className="columnDirection"
      sx={{
        p: 2,
        mb: 5,
        backgroundColor: (theme) => theme.palette.subPrimary.main,
      }}
      container>
      <Grid
        className="notificationRibonConent"
        sx={{ p: 1, borderRight: "1px solid #fff" }}
        lg={3}
        xs={6}
        color="primary.main"
        item>
        <Box className="circleRadius">
          <Image src={completedIcon} alt="Why Choose Us" />
        </Box>
        <Box sx={{ pl: 2 }} className="mobileCenter">
          <Typography variant="h6">90,000</Typography>
          <Typography variant="body">Completed Jobs</Typography>
        </Box>
      </Grid>
      <Grid
        className="notificationRibonConent"
        sx={{ p: 1, borderRight: "1px solid #fff" }}
        lg={3}
        xs={6}
        color="primary.main"
        item>
        <Box className="circleRadius">
          <Image src={satisfiedIcon} alt="Why Choose Us" />
        </Box>
        <Box sx={{ pl: 2 }} className="mobileCenter">
          <Typography variant="h6">65,000</Typography>
          <Typography variant="body">Satisfied Customers</Typography>
        </Box>
      </Grid>
      <Grid
        className="notificationRibonConent"
        sx={{ p: 1, borderRight: "1px solid #fff" }}
        lg={3}
        xs={6}
        color="primary.main"
        item>
        <Box className="circleRadius">
          <Image src={requestIcon} alt="Why Choose Us" />
        </Box>
        <Box sx={{ pl: 2 }} className="mobileCenter">
          <Typography variant="h6">4,700</Typography>
          <Typography variant="body">Monthly Job Requests</Typography>
        </Box>
      </Grid>
      <Grid
        className="notificationRibonConent"
        sx={{ p: 1, borderRight: { lg: "none", xs: "1px solid #fff" } }}
        lg={3}
        xs={6}
        color="primary.main"
        item>
        <Box className="circleRadius">
          <Image src={customersIcon} alt="Why Choose Us" />
        </Box>
        <Box sx={{ pl: 2 }} className="mobileCenter">
          <Typography variant="h6">35,000</Typography>
          <Typography variant="body">Repeat Cutomers</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
