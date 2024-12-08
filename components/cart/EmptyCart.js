// @flow
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import DialogBox from "components/style/DialogBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

export default function EmptyCart({ handelRefresh }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Badge
        sx={{ cursor: "pointer", paddingLeft: {md:"25px", xs:"15px", sm:"15px"},paddingRight: {md:"", xs:"10px", sm:"10px"}}}
        onClick={handleOpen}
        className="test"
        color="secondary"
        overlap="rectangular">
        <ShoppingCartIcon />
      </Badge>
      <DialogBox
        open={open}
        paperPropsSx={{ top: { lg: 80, md: 80 }, left: { lg: 900, md: 900 } }}
        disableAction={reason.length > 10 ? false : true}
        handleClose={() => handleClose()}>
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            width: 325,
            height: 250,
            flexDirection: "column",
          }}>
          <Box className="empty_cart_icon" />
          <Typography variant="h5">Your cart is empty!</Typography>
          <Typography sx={{ fontSize: 13 }}>
            You have not added any products to your cart so far.
          </Typography>
        </Box>
      </DialogBox>
    </>
  );
}
