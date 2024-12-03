import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ListItems from "components/style/ListItems";
import KeyCurrency from "components/style/KeyCurrency";
import { cartItems, addCartItem, removeCartItem } from "../../store/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import QuantityBox from "./QuantityBox";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const featureList = [
  "Cleaning of AC filters, cooling coil, drain tray and other parts",
  "Gas pressure check, if required",
  "Cleaning of the outdoor unit with water jet for split AC, if possible",
  "Pre and post service check of AC controls and functioning",
  "Cleaning of the area post service",
  "Installation, uninstallation and cost of spare parts, if required, are not covered",
];

export default function ServiceItemDetail({ category, services }) {
  const [expanded, setExpanded] = useState(false);
  const cartItemsList = useSelector(cartItems);

  const dispatch = useDispatch();

  const handleCart = (service, category, action) => {
    dispatch(action({ service, category }));
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const getItemFromCart = (service) => {
    return cartItemsList[category.cid]
      ? cartItemsList[category.cid].items.filter(
        (item) => service.sid == item.sid
      )[0]
      : undefined;
  };

  return (
    <>
      {services.map((service, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Card key={index}>
            <CardActions
              sx={{ backgroundColor: expanded ? "#FFEBEE" : "" }}
              disableSpacing>
              <CardContent>
                <Grid
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  direction="row"
                  container>
                  <Grid
                    justifyContent={"start"}
                    sx={{
                      width: { lg: "24rem" },
                      p: 1,
                      borderRight: { lg: "0.01rem dotted red" },
                    }}
                    lg={7}
                    item>
                    <Typography
                      sx={{ fontSize: "0.99rem" }}
                      component="h4"
                      align="left"
                      variant="body2">
                      {service.title}
                    </Typography>
                    <Typography
                      sx={{ fontSize: "0.76rem" }}
                      align="left"
                      variant="subtitle1"
                      color="text.secondary"
                      dangerouslySetInnerHTML={{
                        __html: service.body,
                      }}
                      flexWrap></Typography>
                  </Grid>
                  {/* <Grid
                    sx={{ display: "flex" }}
                    justifyContent={"center"}
                    lg={5}
                    md={12}
                    sm={12}
                    xs={12}
                    item>
                    <Stack
                      direction={{ lg: "row", md: "row", sm:"row" }}
                      alignItems="start">
                      <KeyCurrency value={service.cost}  />
                      {getItemFromCart(service) ? (
                        <QuantityBox
                          remove={() =>
                            handleCart(service, category, removeCartItem)
                          }
                          add={() => handleCart(service, category, addCartItem)}
                          quantity={getItemFromCart(service).qty}
                        />
                      ) : (
                        <Button
                          onClick={() =>
                            handleCart(service, category, addCartItem)
                          }
                          variant="outlined"
                          sx={{
                            "&::after": {
                              content: '"+"',
                              width: "100%",
                              display: "block",
                              height: "1rem",
                              marginTop: "-0.9rem",
                            },
                          }}>
                          Add
                        </Button>
                      )}
                    </Stack>
                  </Grid> */}
                  <Grid
                    container
                    item
                    lg={5}
                    md={12}
                    sm={12}
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Grid item xs="auto">
                      <KeyCurrency value={service.cost} />
                    </Grid>
                    <Grid item xs="auto">
                      {getItemFromCart(service) ? (
                        <QuantityBox
                          remove={() => handleCart(service, category, removeCartItem)}
                          add={() => handleCart(service, category, addCartItem)}
                          quantity={getItemFromCart(service).qty}
                        />
                      ) : (
                        <Button
                          onClick={() => handleCart(service, category, addCartItem)}
                          variant="outlined"
                          sx={{
                            "&::after": {
                              content: '"+"',
                              width: "100%",
                              display: "block",
                              height: "1rem",
                              marginTop: "-0.9rem",
                            },
                          }}
                        >
                          Add
                        </Button>
                      )}
                    </Grid>
                  </Grid>

                </Grid>
              </CardContent>{" "}
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                sx={{ background: "#ffebee" }}
                aria-label="show more">
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                {service.detail ? (
                  <Box
                    sx={{ fontSize: "1rem" }}
                    align="left"
                    className="service-detail"
                    dangerouslySetInnerHTML={{
                      __html: service.detail,
                    }}
                  />
                ) : (
                  <ListItems list={featureList} />
                )}
              </CardContent>
            </Collapse>
          </Card>
        </Box>
      ))}
    </>
  );
}
