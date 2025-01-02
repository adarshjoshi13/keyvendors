import Box from "@mui/material/Box";
import React, { lazy, Suspense } from "react";
import CartItems from "./CartItems";
import CartProgress from "./CartProgress";
import { useSelector } from "react-redux";
import { getLocation } from "store/locationSlice";
import { useIsLarge } from "utils/hooks";
import { cartItems, cartGrandTotal,cartSubTotal, cartCoupon } from "../../store/cartSlice";
import CartItemsMobile from "./CartItemsMobile";
import Loader from "components/style/Loader";
import CartAccordion from "../style/CartAccordion";
const VerifyLocation = lazy(() => import("./VerifyLocation"));
const VerifyNumber = lazy(() => import("./VerifyNumber"));
const CartPayment = lazy(() => import("./CartPayment"));
const CartSlot = lazy(() => import("./CartSlot"));
const CartPersonalDetail = lazy(() => import("./CartPersonalDetail"));

function CartDetail() {
  const cartItemsList = useSelector(cartItems);
  const invoiceTotal = useSelector(cartGrandTotal);
  const subTotal = useSelector(cartSubTotal);
  
  const couponDetail = useSelector(cartCoupon);

  const location = useSelector(getLocation);
  const isLarge = useIsLarge();

  return (
    <Box sx={{ pt: { lg: 0, xs: 5, md: 5 } }}>
      <CartProgress step="cart" bgColor={"#A7F3FB"} />
      {isLarge ? (
        <CartItems
          couponDetail={couponDetail}
          cartItemsList={cartItemsList}
          invoiceTotal={invoiceTotal}
          subTotal={subTotal}
        />
      ) : (
        <CartItemsMobile
          cartItemsList={cartItemsList}
          invoiceTotal={invoiceTotal}
          subTotal={subTotal}
          couponDetail={couponDetail}
        />
      )}

      <Suspense
        fallback={
          <CartAccordion>
            <Loader />
          </CartAccordion>
        }>
        <VerifyNumber />
        <VerifyLocation />
        <CartPersonalDetail />
        <CartSlot cartItemsList={cartItemsList} />
        <CartPayment
          cartItemsList={cartItemsList}
          invoiceTotal={invoiceTotal}
        />
      </Suspense>
    </Box>
  );
}

export default CartDetail;
