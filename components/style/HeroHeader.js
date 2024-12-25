import React from "react";
import {Box,Typography} from "@mui/material";
import aboutUs from "public/assets/images/aboutusimage.png";
import ContactUs from "public/assets/images/contactUs.jpeg";
import Image from "next/image";

export function HeroHeader({ title, sx }) {
  const defaultSx = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "20rem",
    backgroundColor: "lightpink",
    overflow: "hidden",
    ...sx, // Allow additional styles to be passed as props
  };

  return (
    <Box sx={defaultSx}>
      {title === 'About Us' ? (
        <Image src={aboutUs} width="100%" height="100%" alt="About Us" style={{ objectFit: "cover" }} />
      ) : (
        <Image src={ContactUs} width="100%" height="100%" alt="About Us" style={{ objectFit: "cover" }} />
        // <Typography sx={{ textTransform: "capitalize" }} variant="h2">
        //   {title}
        // </Typography>
      )}
    </Box>
  );
}
