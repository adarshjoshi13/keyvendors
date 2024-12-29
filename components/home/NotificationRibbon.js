import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import completedIcon from "public/assets/completedIcon.png";
import requestIcon from "public/assets/requestIcon.png";
import satisfiedIcon from "public/assets/satisfiedIcon.png";
import customersIcon from "public/assets/customersIcon.png";
import {fetchOrderSummary} from "services/api";
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import Image from "next/image";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";

export default function NotificationRibbon() {
  const [orderSummar, setOrderSummar] = useState([]);
  const fetchOrderSummarys = async () => {
    try {
      const response = await fetchOrderSummary(`ordersummary`);
      if (response.status === 200 && response.data) {
        setOrderSummar(response.data);
        console.log("Payment Options:", response.data);
      } else {
        console.error("Failed to fetch payment options:", response.status);
      }
    } catch (error) {
      console.error("Error fetching payment options:", error);
    }
  };
  
  useEffect(() => {
    fetchOrderSummarys();
  }, []);
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
          <Typography variant="h6">{orderSummar.completed_jobs}</Typography>
          <Typography variant="body">Completed Services</Typography>
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
          <Typography variant="h6">{orderSummar.satisfied_customers}</Typography>
          <Typography variant="body">Satisfied Customers</Typography>
        </Box>
      </Grid>
      <Grid
        className="notificationRibonConent"
        sx={{ p: 1, borderRight: "1px solid #fff" }}
        lg={2}
        xs={6}
        color="primary.main"
        item>
        <Box className="circleRadius">
          <Image src={requestIcon} alt="Why Choose Us" />
        </Box>
        <Box sx={{ pl: 2 }} className="mobileCenter">
          <Typography variant="h6">{orderSummar.monthly_job_requests}</Typography>
          <Typography variant="body">Monthly Service Requests</Typography>
        </Box>
      </Grid>
      <Grid
        className="notificationRibonConent"
        sx={{ p: 1, borderRight: "1px solid #fff" }}
        lg={2}
        xs={6}
        color="primary.main"
        item>
        <Box className="circleRadius">
          <Image src={customersIcon} alt="Why Choose Us" />
        </Box>
        <Box sx={{ pl: 2 }} className="mobileCenter">
          <Typography variant="h6">{orderSummar.repeat_customers}</Typography>
          <Typography variant="body">Repeat Cutomers</Typography>
        </Box>
      </Grid>
      <Grid
        className="notificationRibonConent"
        sx={{ p: 1, borderRight: { lg: "none", xs: "1px solid #fff" } }}
        lg={2}
        xs={6}
        color="primary.main"
        item>
        <Box className="circleRadius">
          <Image src={customersIcon} alt="Why Choose Us" />
        </Box>
        <Box sx={{ pl: 2 }} className="mobileCenter">
          <Typography variant="h6">5 K+</Typography>
          <Typography variant="body">Technicians</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
