import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { selectCartState, cartGrandTotal } from "../../store/cartSlice";
import { useSelector } from "react-redux";
import { Details } from "./Details";
import { useIsMobile } from "utils/hooks";
import ContentBox from "components/style/ContentBox";
import { fetchData } from "services/api";

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function ServiceDetail({ service, selectedService, refProp, showContent, disableTab, serviceMetaDetails}) {
  const cartState = useSelector(selectCartState);
  const invoiceTotal = useSelector(cartGrandTotal);
  const selectedSrv = selectedService
    ? selectedService
    : service.children.length
      ? service.children[0].slug
      : 0;
  const [value, setValue] = React.useState(selectedSrv);
  const [tabIndex, setTabIndex] = React.useState(4);
  const [isReviewFormVisible, setReviewFormVisible] = useState(false);

  const isMobile = useIsMobile();

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const handleTabChange = (_event, newValue) => {
    setTabIndex(newValue);
  };
  const toggleReviewForm = () => {
    setReviewFormVisible((prev) => !prev);
  };

  const [reviews, setReviews] = useState([]);

  const getCategoryReview = async () => {
    try {
      const response = await fetchData(`service-location-reviews/${serviceMetaDetails.id}`);
      console.log('sandipresponse', response.status);
      if(response.status == 200){
        setReviews(response.data);
      }
    } catch (error) {
      console.error("Error fetching customer reviews:", error);
    }
  };


  const beforePrp = {
    content: '""',
    width: "100%",
    display: "block",
    height: "25rem",
    background: "#ffebee",
    backgroundSize: "cover",
  };

  return (
    <>
      <Box
        ref={refProp}
        component={"section"}
        sx={{
          // "&::before": { lg: beforePrp, md: beforePrp },
        }}>
        {isMobile ? (
          <Details
            service={service}
            value={value}
            handleChange={handleChange}
            invoiceTotal={invoiceTotal}
            cartState={cartState}
            disableTab={disableTab}
          />
        ) : (
          <>
            <Paper
              sx={{
                position: "relative",
                mx: "1.5rem",
                // mt: "1rem",
                p: 2,
              }}
            >
              <Details
                // sx={{ mt: 3 }}
                service={service}
                value={value}
                handleChange={handleChange}
                invoiceTotal={invoiceTotal}
                cartState={cartState}
                disableTab={disableTab}
              />
            </Paper>
            <Paper
              sx={{
                position: "relative",
                mx: "1.5rem",
                mt: "1rem",
                p: 2,
                // pt: 5
              }}
              elevation={1}>
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{ marginBottom: "10px" }}
              >
                {/* Tab 1 */}
                <Tab label="Why choose us ?" />

                {/* Tab 2 */}
                <Tab label="How it Works" />

                {/* Tab 3: Customer Reviews */}
                <Tab
                  label="Customer Reviews"
                  onClick={() => {
                    getCategoryReview(); // Trigger API call for Customer Reviews
                  }}
                />

                {/* Tab 4: Blog */}
                <Tab
                  label="Blog"
                  href={
                    serviceMetaDetails
                      ? serviceMetaDetails.blog
                      : "https://keyvendors.com/blogs/"
                  }
                />

                {/* Tab 5: About */}
                <Tab
                  label={`About ${serviceMetaDetails ? serviceMetaDetails.seo_keyword : service.title}`}
                />
              </Tabs>
              <TabPanel value={tabIndex} index={0}>
                <Box
                    dangerouslySetInnerHTML={{
                      __html: service.advantage_message,
                    }}
                  />
              </TabPanel>

              <TabPanel value={tabIndex} index={1}>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: service.how_it_works
                  }}
                />
              </TabPanel>

              <TabPanel value={tabIndex} index={2}>
              <Box 
                sx={{
                  textAlign: "center", 
                  marginBottom: "20px", 
                  padding: "2px 0"
                }}
              >
                {/* Customer Reviews (Centered) */}
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontSize: "22px !important",
                    fontWeight: "bold",
                    textAlign: "center",
                    // color: "primary.main",
                  }}
                >
                  Customer Reviews
                </Typography>

                {/* WRITE YOUR REVIEW Button */}
                <Typography
                  variant="h4"
                  gutterBottom
                  onClick={toggleReviewForm}
                  sx={{
                    display: "inline-block",
                    textAlign: "center",
                    cursor: "pointer",
                    fontSize: "18px !important",
                    fontWeight: "bold",
                    color: "#ffffff",
                    backgroundColor: "#1976d2", // Primary blue color
                    padding: "10px 20px",
                    borderRadius: "5px",
                    textTransform: "uppercase",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#005bb5", // Darker shade of blue
                      boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  WRITE YOUR REVIEW
                </Typography>
              </Box>

                {isReviewFormVisible && (
                  <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
                    <Box sx={{ mb: 2 }}>
                      <input
                        type="text"
                        placeholder="Your Name"
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginBottom: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      />
                      <textarea
                        placeholder="Your review"
                        rows={4}
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginBottom: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      />
                    </Box>
                    <Typography gutterBottom>Your Rating:</Typography>
                    <Box sx={{ display: "flex", gap: "5px", mb: 3 }}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span
                          key={index}
                          style={{
                            fontSize: "1.5rem",
                            cursor: "pointer",
                          }}
                        >
                          ☆
                        </span>
                      ))}
                    </Box>
                    <button
                      type="submit"
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "black",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Submit
                    </button>
                  </Box>
                )}

                <Box sx={{ p: 2 }}>
                  {reviews.map((review) => (
                    <Box
                      key={review.id}
                      sx={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "16px",
                        mb: 3,
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      {/* Name */}
                      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                        {review.name}
                      </Typography>
                      {/* Stars */}
                      <Box sx={{ display: "flex", gap: "5px", mb: 2 }}>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={index}
                            style={{
                              fontSize: "1.5rem",
                              cursor: "pointer",
                              color: index < review.rating ? "#FFD700" : "#ddd", // Fill stars based on rating
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </Box>
                      {/* Review */}
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        {review.review}
                      </Typography>
                      {/* Date */}
                      <Typography variant="caption" color="textSecondary">
                        {new Date(review.created_at).toLocaleDateString()}
                      </Typography>
                    </Box>
                  ))}
                </Box>

              </TabPanel>
              <TabPanel value={tabIndex} index={4}>
              <Box
                      dangerouslySetInnerHTML={{
                        __html: serviceMetaDetails ? serviceMetaDetails.about : ''
                      }}
                    />
              </TabPanel>
            </Paper>
          </>
        )}
      </Box>
      {showContent && (
        <>
          {service.advantage_message && (
            <Box
              dangerouslySetInnerHTML={{
                __html: service.advantage_message,
              }}
            />
          )}
          {service.about && (
            <ContentBox sx={{ mt: 5 }} title="About The Service">
              <Box
                dangerouslySetInnerHTML={{
                  __html: service.about,
                }}
              />
            </ContentBox>
          )}
        </>
      )}
    </>
  );
}

export default ServiceDetail;
