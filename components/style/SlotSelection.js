import React, { useEffect, useRef } from "react";
import { Box, Grid, Typography, Divider, Button } from "@mui/material";
import Carousel from "components/style/Carousel/Carousel";
import { useIsMobile } from "utils/hooks";
export function SlotSelection({
  cartItemsList,
  selectedService,
  setSelectedItem,
  dateArray,
  selectedItem,
  selectedSlot,
  handleAddSlot,
  not_available_dates
}) {
  const carouselRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (dateArray.length > 0) {
      carouselRef.current.handleSelection(selectedItem);
    }
  }, [selectedItem, dateArray]);

  const isAvailableDate=(date,slot,time)=>{
    if(not_available_dates){
     let selectedDate=JSON.parse(not_available_dates).filter((value)=>value.date==date);
      if(selectedDate.length>0){
        let slotTime=selectedDate[0][slot.toLowerCase()+'_times'];       
        if(slotTime){
          if(slotTime.filter((value)=>value.value ==time).length){
           return true;
          }         
        }
      }
    }
    return false;
  }
  return (
    <Box>
      {cartItemsList && (
        <Typography
          sx={{ display: "flex", fontSize: 14, fontWeight: "700" }}
          variant="h6"
          component={"div"}>
          Select date and time [{cartItemsList[selectedService].title}]
        </Typography>
      )}
      <Carousel
        ref={carouselRef}
        show={isMobile ? 1 : 3}
        onSelectedItem={(val) => setSelectedItem(val)}>
        {dateArray.map((value, key) => {
          let current = key + 1;
          return (
            <Typography
              id={"slides__" + current}
              key={"slides__" + current}
              sx={{ cursor: "pointer" }}
              component={"div"}
              className="slide red">
              <p className="slide__date">{value.date.value}</p>
              <span className="slide__text">{value.availability}</span>
            </Typography>
          );
        })}
      </Carousel>

      <Box className="slot-container">
        <Box
          className="slot-items"
          style={{
            transform: `translateX(-${selectedItem * 100}%)`,
          }}>
            
          {dateArray.map((value, key) => {
            let current = key + 1;
            return (
              <Box
                id={"slot" + current}
                key={"slot_" + current}
                className="slot-item"
                {...(current == selectedItem && {
                  "is-selected": "true",
                })}
              >
                {!isMobile && (
                  <>
                    <Typography className="slide__date">
                      {value.date.value}
                    </Typography>
                    <Divider sx={{ my: 2 }} orientation="horizontal" flexItem />
                  </>
                )}
                <Grid
                  container
                  spacing={3}
                  justifyContent="center"
                  direction="row">
                  {Object.keys(value.slots).map((slot, index) => (
                    <Grid lg={4} sm={12} key={index} item>
                      <Box
                        sx={{
                          p: 1,
                          backgroundColor: "#FFFFFF",
                          fontWeight: 800,
                        }}>
                        {slot}
                      </Box>
                      <>
                        {value.slots[slot].map((time, index) => (
                          <Box key={"bb_" + index} sx={{ p: 1 }}>
                            <Button
                            disabled={isAvailableDate(value.date.key,slot,time)}
                              variant="outlined"
                              sx={{

                                backgroundColor:
                                  selectedSlot[selectedService] &&
                                  selectedSlot[selectedService].time == time &&
                                  selectedSlot[selectedService].date ==
                                    value.date.key &&
                                  selectedSlot[selectedService].slot == slot
                                    ? "green"
                                    : "#E5F4FA",
                                    color:"black"
                              }}
                              onClick={() =>
                                handleAddSlot({
                                  [selectedService]: {
                                    cid: selectedService,
                                    date: value.date.key,
                                    slot: slot,
                                    time: time,
                                  },
                                })
                              }>
                              {time}
                            </Button>
                          </Box>
                        ))}
                      </>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
