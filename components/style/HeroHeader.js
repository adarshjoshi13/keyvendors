import React from "react";
import {Box,Container, Link} from "@mui/material";
import aboutUs from "public/assets/images/aboutusimage.png";
import ContactUs from "public/assets/images/contactUs.jpeg";
import Image from "next/image";
import ImageWithFallback from "components/style/ImageWithFallback";


export function HeroHeader({ title, sx }) {
  const defaultSx = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: { xs: "15rem", sm: "20rem" }, // Responsive height
    backgroundColor: "lightpink",
    overflow: "hidden",
    ...sx,
  };
  const width = "0";
  const height = "0";
  return (
      <Box sx={{ mt:1 }}>
        {/* <Image
          src={title === "About Us" ? aboutUs : ContactUs}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        /> */}
        <ImageWithFallback                
          alt="Key Vendors"
          src={title === "About Us" ? aboutUs : ContactUs}
          width={width}
          height={height}
          lazyOff={false}
          layout="responsive"
        />
      </Box>
  );
}
