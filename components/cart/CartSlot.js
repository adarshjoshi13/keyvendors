import React, { useEffect, useState, memo, useCallback } from "react";
import CartAccordion from "../style/CartAccordion";
import { Tabs, Tab, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectCartState } from "../../store/cartSlice";
import { getCustomerSlot, addSlot } from "../../store/cartSlice";
import { fetchData } from "services/api";
import { SlotSelection } from "components/style/SlotSelection";
import { getSlotFormatDate } from "utils/utility";
import { useIsLarge } from "utils/hooks";
import { styled } from "@mui/material/styles";
import useSWR from 'swr';

const CartSlot = memo(function CartSlotC({ cartItemsList }) {
  const selectedSlot = useSelector(getCustomerSlot);
  const cartState = useSelector(selectCartState);
  const catIds = Object.keys(cartItemsList);
  const [selectedService, setSelectedService] = useState(catIds[0]);
  const [selectedItem, setSelectedItem] = useState(0);
  const [dateArray, setDateArray] = useState([]);

  const dispatch = useDispatch();
  const isLarge = useIsLarge();

  const { data: dates } = useSWR("date-list", fetchData, { revalidateOnFocus: false });
  const { data: times } = useSWR("time-list", fetchData, { revalidateOnFocus: false });

  const handleAddSlot = (slot) => {
    dispatch(addSlot(slot));
  };

  const getSelectedDateIndex = useCallback(
    (selectedDate) => {
      return dateArray.findIndex((date) => date.date.key === selectedDate);
    },
    [dateArray]
  );

  const TabRoot = styled(Tabs)(({ theme }) => ({
    [theme.breakpoints.only("xs")]: {
      "& .MuiTabs-scrollButtons.Mui-disabled": {
        opacity: 0.3,
      },
    },
  }));

  const handleCategorySelection = useCallback(
    (key) => {
      let index =
        selectedSlot[key] !== undefined
          ? getSelectedDateIndex(selectedSlot[key].date)
          : 0;

      setSelectedItem(index > 0 ? index : 0);
    },
    [getSelectedDateIndex, selectedSlot]
  );

  useEffect(() => {
    let dateArrayLength = dateArray.length;
    if (dateArrayLength < 1) {
      if (dates && times) {
        setDateArray(getSlotFormatDate(dates, times));
      }
    } else {
      if (selectedService && dateArrayLength > 0) {
        handleCategorySelection(selectedService);
      }
    }
  }, [dates, times, dateArray, handleCategorySelection, selectedService, cartItemsList]);

  return (
    <CartAccordion id="service-slot" title="Select Service Slot">
      {cartState > 0 && selectedService && (
        <Grid
          alignItems="start"
          alignContent="start"
          justifyContent="center"
          container>
          <Grid lg={4} sm={12} xs={12} item>
            <TabRoot
              value={selectedService}
              scrollButtons
              allowScrollButtonsMobile
              variant="scrollable"
              orientation={isLarge ? "vertical" : "horizontal"}
            >
              {catIds.map((key, index) => (
                <Tab
                  key={index + "_item"}
                  sx={{
                    display: "flex",
                    border: "1px solid grey",
                    cursor: "pointer",
                    backgroundColor: selectedService == key ? "grey" : "lightgray",
                    fontSize: 14,
                    mr: { lg: 5 },
                    ml: 1,
                    mb: 1,
                    fontWeight: "500",
                  }}
                  value={key}
                  onClick={() => setSelectedService(key)}
                  component={"div"}
                  label={cartItemsList[key].title}
                  wrapped
                />
              ))}
            </TabRoot>
          </Grid>
          <Grid lg={8} sm={12} xs={12} item>
            <SlotSelection
              cartItemsList={cartItemsList}
              selectedService={selectedService}
              setSelectedItem={setSelectedItem}
              dateArray={dateArray}
              selectedItem={selectedItem}
              selectedSlot={selectedSlot}
              handleAddSlot={handleAddSlot}
              not_available_dates={
                cartItemsList[selectedService]?.not_available_dates
              }
            />
          </Grid>
        </Grid>
      )}
    </CartAccordion>
  );
});

export default CartSlot;
