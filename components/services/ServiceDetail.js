import React from "react";
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

function ServiceDetail({ service, selectedService, refProp, showContent, disableTab }) {
  const cartState = useSelector(selectCartState);
  const invoiceTotal = useSelector(cartGrandTotal);
  const selectedSrv = selectedService
    ? selectedService
    : service.children.length
    ? service.children[0].slug
    : 0;
  const [value, setValue] = React.useState(selectedSrv);
  const [tabIndex, setTabIndex] = React.useState(0);

  const isMobile = useIsMobile();

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const handleTabChange = (_event, newValue) => {
    setTabIndex(newValue);
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
                <div style={{textAlign:"center"}}>
                  <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth" sx={{marginBottom:"10px"}}>
                    <Tab label="Why Us ?" />
                    <Tab label="How it Works" />
                    <Tab label="Customer Reviews" />
                    <Tab label="Blog" href="/blogs/"/>
                  </Tabs>
                  <span style={{ color: "#646464" }}>About ac service in ghaziabad in new</span>
                </div>
             
              <TabPanel value={tabIndex} index={0}>
                <Typography variant="h4" gutterBottom sx={{ fontSize: "22px", paddingBottom: "2%" }}>
                  Why Key Vendors?
                  <hr></hr>
                </Typography>
                <Typography paragraph>
                  <strong>Professionals AC Technician</strong>
                  <br />
                  Our technicians are highly trained professionals when it comes to giving the best AC services in Delhi and other cities. We also prioritize polite customer interaction to ensure that you receive service of the highest standard.
                </Typography>
                <Typography paragraph>
                  <strong>Online And COD Payments Options</strong>
                  <br />
                  At Keyvendors, we offer both online payments and cash on delivery payment, with no hidden costs and unexpected surprises. Enjoy hassle-free transactions, making the process easy and flexible for your comfort.
                </Typography>
                <Typography paragraph>
                  <strong>90 Days Warranty For Gas Refilling Service</strong>
                  <br />
                  At Keyvendors, we stand behind the quality of our work, which is why, to give you the peace of mind, we offer a 90 days warranty for our gas refilling service, a benefit our competitors may not provide.
                </Typography>
                <Typography paragraph>
                  <strong>100% Genuine Spare Parts</strong>
                  <br />
                  To ensure a long-lasting performance of your AC, you should only use genuine parts. When offering AC repair, our technicians ensure that they use 100% genuine spare parts bought from authentic sources for the repairs.
                </Typography>
                <Typography paragraph>
                  <strong>Lowest Prices Guaranteed</strong>
                  <br />
                  Keyvendors provides affordable pricing to their customers so that they save up to 40% of what their competitors offer. The reason for lower pricing is because we don't use surcharges on the parts we provide for AC repair and services at low cost.
                </Typography>
                <Typography paragraph>
                  <strong>Free Cancellation And Reschedule</strong>
                  <br />
                  With Keyvendors, you have the option of canceling and rescheduling your AC repair schedule anytime you want without any added charge to your budget.
                </Typography>
              </TabPanel>
              <TabPanel value={tabIndex} index={1}>
                <Typography variant="h4" gutterBottom sx={{ fontSize: "22px", paddingBottom: "2%" }}>
                  How it Works?
                  <hr></hr>
                </Typography>
                <Typography paragraph>
                  <strong>Book An Appointment:</strong>
                  <br />
                  Customers can book an appointment for AC services through the Keyvendors website or by calling their customer support team.
                </Typography>
                <Typography paragraph>
                  <strong>Quotation:</strong>
                  <br />
                  The technician will provide the customer with a detailed quotation for the repair work needed, including the cost of any replacement parts.
                </Typography>
                <Typography paragraph>
                  <strong>Repair Or Service:</strong>
                  <br />
                  Once the customer approves the quotation, the technician will proceed with the repair or service work, replacing any faulty parts and ensuring that the AC unit is working properly.
                </Typography>
                <Typography paragraph>
                  <strong>Payment:</strong>
                  <br />
                  Once the work is completed, the customer can make payment via cash, credit/debit card, or online payment.
                </Typography>
                <Typography paragraph>
                  <strong>Feedback:</strong>
                  <br />
                  Keyvendors values customer feedback, and so they will ask for feedback from customers to ensure that they are satisfied with the services provided.
                </Typography>
              </TabPanel>
              <TabPanel value={tabIndex} index={2}>
                <Typography variant="h4" gutterBottom sx={{ fontSize: "22px", paddingBottom: "2%" }}>
                  Customer Reviews
                </Typography>
                <Typography paragraph sx={{ color: "#646464" }}>
                  of AC service in Ghaziabad Professionals in New, Ghaziabad
                </Typography>
                <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    WRITE YOUR REVIEW
                  </Typography>
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
              </TabPanel>
            </Paper>
          </>
        )}
      </Box>
      {showContent && (
        <>
          {service.advantage_message && (
            <ContentBox
              sx={{ mt: 5, p: 3, bgcolor: "#F8F8F2" }}
              title="Advantage of this service">
              <Box
                dangerouslySetInnerHTML={{
                  __html: service.advantage_message,
                }}
              />
            </ContentBox>
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
