import React, { memo } from "react";
import Button from "@mui/material/Button";
import PopupState, { bindHover, bindPopover } from "material-ui-popup-state";
import Box from "@mui/material/Box";
import ServicesMenu from "./ServicesMenu";
import HoverPopover from "material-ui-popup-state/HoverPopover";

export default memo(function MegaMenu({
  buttonValue,
  id,
  items,
  buttonLink,
  buttonProp,
}) {
  return (
    <PopupState
      variant="popover"
      popupId={`mega-menu-popup-popover${id}`}
      id={id}>
      {(popupState, index) => (
        <Box key={index}>
          <Button {...buttonProp} {...bindHover(popupState)}>
            {buttonValue}
          </Button>
          <HoverPopover
            {...bindPopover(popupState)}
            sx={{ top: 3, width: "100%" }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}>
            <ServicesMenu items={items} />
          </HoverPopover>
        </Box>
      )}
    </PopupState>
  );
});
