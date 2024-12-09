import { useCallback, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ShadowTitle from "components/style/ShadowTitle";
import Title from "components/style/Title";
import Link from 'next/link';
import ImageWithFallback from "components/style/ImageWithFallback";
import { useLocation } from "utils/hooks";
import { getServiceUrl } from "utils/utility";

export default function Services({services}) {
const location =useLocation();

  return (
    <>
    <Box sx={{paddingBottom:"40px"}}>
      <ShadowTitle title="Our Services" />
      <Title title="Our Most Used Services" />
      <Grid justifyContent={"center"}container spacing={2}>
              {services.map((image, index) => (
                <Grid item lg={12/5} xl={12 / 5} md={12/3} xs={12/2} key={index}>
                  <Box sx={{ display:"flex" ,flexDirection: 'column' , alignItems: 'center',justifyContent: 'center'}}>
                  <Link href={getServiceUrl(location,image.slug)}>
                    <ImageWithFallback                    
                      alt={image.title}
                      src={image.icon}
                      width={80}
                      height={80}
                    />
                    </Link>
                    <Box
                      style={{
                        fontWeight:700,
                        fontSize: ".79rem",
                        textTransform: "capitalize",
                      }}
                      className="hoverText"
                      component="p"                     
                      align="center"
                      color="text.primary"                      
                      >
                      {image.title}
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
      </Box>
    </>
  );
}
