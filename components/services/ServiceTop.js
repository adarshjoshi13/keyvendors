import React from "react";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Breadcrumb from "components/style/Breadcrumb";
import ImageWithFallback from "components/style/ImageWithFallback";
import { useSelector } from "react-redux";
import { getLocation } from "store/locationSlice";

function ServiceTop({ service, scrollToRef, titleWithLocation }) {
  const location = useSelector(getLocation);
  const scrollTo = (ref) => {
    if (ref && ref.current /* + other conditions */) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <>
      <Breadcrumb title={service.title} />
      <Grid container>
        <Grid item xl={12} xs={12} lg={6}>
          <Box sx={{ py: 1 }}>
            <ImageWithFallback
              fallbackSrc="/assets/images/default_service.jpeg"
              alt={service.title}
              src={service.image}
              width={527}
              height={372}
              layout="responsive"
            />
          </Box>
        </Grid>
        <Grid item xl={6} xs={12} lg={6}>
          <Box
            sx={{
              py: { xl: 8, xs: 0, lg: 8 },
              pb: { xs: 5 },
              pr: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Typography
              component="h1"
              variant="h4"
              align="left"
              color="text.primary">
              {titleWithLocation
                ? `${service.title} in ${
                    location ? location.locality : "Delhi/NCR"
                  }`
                : service.title}
            </Typography>
            <Typography
              component="div"
              dangerouslySetInnerHTML={{
                __html: service.highlight_message,
              }}
              gutterBottom></Typography>
            <Box
              sx={{
               p: { xs: 2, sm: 4, md: 6 },
                pl: 0,
              }}>
              <Button
                component="a"
                onClick={() => scrollTo(scrollToRef)}
                sx={{ borderRadius: 29, width: 250 }}
                size="large"
                variant="contained">
                GET STARTED
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ServiceTop;
