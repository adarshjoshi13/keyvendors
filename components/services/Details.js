import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ServiceItemDetail from "./ServiceItemDetail";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "components/style/TabPanel";
import { a11yPropsTab } from "utils/utility";
import { useSelector } from "react-redux";
import { getLocation } from "store/locationSlice";
import { TotalAmount } from "components/style/TotalAmount";
export function Details({
  service,
  value,
  handleChange,
  invoiceTotal,
  cartState,
  disableTab
}) {
  const location = useSelector(getLocation);
  return (
    <Grid spacing={2} container>
      <Grid
        xs={12}
        md={6}
        sm={12}
        lg={6}
        order={{ lg: 1, md: 1, xs: 2, sm: 2 }}
        item>
        {service.how_it_works && (
          <Typography sx={{ ml:{ xs: 1, sm: 1, md: 3 }, }} component="div" variant={"h5"}>
            <Box
              sx={{ fontSize: "1rem" }}
              dangerouslySetInnerHTML={{
                __html: service.how_it_works,
              }}
            />
          </Typography>
        )}
        <Box sx={{ mt: { xs: 0, sm: 0, md: 3 }, p: { xs: 0, sm: 0, md: 2 } }}>
          <Typography variant="body2" align="center" gutterBottom>
            We offer {service.title} services in many areas in{" "}
            {location ? location.locality : "Delhi/NCR"}.
            <Link style={{ color: "#FF5733" }} href="/">
              Check Popular Localities
            </Link>
          </Typography>
          <Typography variant="body2" align="center" gutterBottom>
            Have questions on your mind?{" "}
            <Link style={{ color: "#FF5733" }} href="/faq">
              Read The FAQs
            </Link>
          </Typography>
        </Box>
      </Grid>
      <Grid
        xs={12}
        sm={12}
        md={6}
        lg={6}
        sx={{ backgroundColor: "#FBFBFB" }}
        order={{ lg: 2, md: 2, xs: 1, sm: 1 }}
        item>
        <Box>
          <Typography align="center" component="h2" variant="h6">
            {service.header_title?service.header_title:service.title}
            <Typography component="h3" variant="body2"sx={{paddingBottom:2}}>Select the type of services</Typography>
          </Typography>
             
          {((service.parent_cid > 0)||disableTab) ? (
            <Box>
              <ServiceItemDetail
                category={{
                  cid: service.cid,
                  title: service.title,
                  image: service.image,
                  not_available_dates: service.not_available_dates,
                }}
                services={disableTab?service.children[0].services:service.services}
              />
            </Box>
          ) : (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  bgcolor: "background.paper",
                }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  textColor="secondary"
                  indicatorColor="secondary"
                  scrollButtons={service.children.length > 1 ? true : false}
                  allowScrollButtonsMobile={
                    service.children.length > 1 ? true : false
                  }
                  sx={{
                    [`& .${tabsClasses.scrollButtons}`]: {
                      "&.Mui-disabled": { opacity: 0.3 },
                    },
                  }}
                  aria-label="scrollable auto tabs">
                  {service.children.map((children, index) => (
                    <Tab
                      key={index}
                      value={children.slug}
                      label={children.title}
                      wrapped
                      {...a11yPropsTab("servicesDetail", index)}
                    />
                  ))}
                </Tabs>
              </Box>
              <Box>
                {service.children.map((children, index) => (
                  <TabPanel key={index} value={value} index={children.slug}>
                    <ServiceItemDetail
                      category={{
                        cid: children.cid,
                        title: children.title,
                        image: children.image,
                        not_available_dates: children.not_available_dates,
                      }}
                      services={children.services}
                    />
                  </TabPanel>
                ))}
              </Box>
            </Box>
          )}

          <Divider sx={{ my: 2 }} orientation="horizontal" flexItem />
          <Box
            sx={{
              display: {xs:"",sm:"flex",md:"flex"},
              justifyContent: "space-between",
              padding: "10px",
            }}>
            <Box>
              <Box
                sx={{
                  display: {xs:"flex",sm:"flex",md:"flex"},
                  fontSize: "0.99rem",
                  direction: "row",
                }}>
                <TotalAmount invoiceTotal={invoiceTotal} />
              </Box>
              <Typography sx={{paddingBottom:{xs:1,sm:2,md:0}}}>{cartState} Service Selected</Typography>
            </Box>
            <Box>
              <Button
                href="/cart"
                sx={{ textTransform: "none", borderRadius: 8, width: 150 }}
                size="large"
                variant="contained">
                Go To Cart
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
