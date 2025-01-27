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
      container
      spacing={3}
      sx={{
        p: 2,
        mb: 5,
        mt: 1,
        backgroundColor: (theme) => theme.palette.subPrimary.main,
        justifyContent: "center",
        alignItems: "stretch", // Ensures all items have the same height
        loading:"lazy"
      }}
    >
      {[
        {
          icon: completedIcon,
          value: orderSummar.completed_jobs,
          label: "Completed Services",
        },
        {
          icon: satisfiedIcon,
          value: orderSummar.satisfied_customers,
          label: "Satisfied Customers",
        },
        {
          icon: requestIcon,
          value: orderSummar.monthly_job_requests,
          label: "Monthly Service Requests",
        },
        {
          icon: customersIcon,
          value: orderSummar.repeat_customers,
          label: "Repeat Customers",
        },
        {
          icon: customersIcon,
          value: "5K+",
          label: "Technicians",
        },
      ].map((item, index) => (
        <Grid
          key={index}
          item
          lg={2}
          md={3}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            p: 2,
            borderRight: {
              lg: index !== 4 ? "1px solid #fff" : "none", // Remove border for the last item
              xs: "none",
            },
            "&:hover": {
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              transform: "scale(1.05)",
              transition: "all 0.3s ease",
            },
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: "50%",
              mb: 1,
            }}
          >
            <Image src={item.icon} alt={item.label} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            {item.value}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#ddd",
            }}
          >
            {item.label}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );  
}
