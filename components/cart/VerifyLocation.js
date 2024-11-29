import React from "react";
import CartAccordion from "../style/CartAccordion";
import LocationButton from "components/style/LocationButton";
import Box from "@mui/material/Box";
const VerifyLocation = React.memo(function VerifyNumberC(props) {
  return (
    <CartAccordion id="verify-location" title="Verify your location">
      <Box sx={{ mx:15, }}><LocationButton hideButton={true} /></Box>
      
    </CartAccordion>
  );
});

export default VerifyLocation;
