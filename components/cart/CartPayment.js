import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { postDataWithUrl } from "services/api";
import { getAuthToken, getAuthInfo, login, updateInfo } from "store/authSlice";
import { cartData, clearCart, getCustomerDetail } from "store/cartSlice";
import { getLocation } from "store/locationSlice";
import { toastMessage } from "utils/utility";
import CartAccordion from "../style/CartAccordion";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState, useMemo, useRef, useEffect } from "react";

function CartPayment({ cartItemsList }) {
  const cartDetail = useSelector(cartData);
  const customerDetail = useSelector(getCustomerDetail);
  const authToken = useSelector(getAuthToken);
  const location = useSelector(getLocation);
  const authInfo = useSelector(getAuthInfo);
  const dispatch = useDispatch();
  const form = useRef(null);
  const [payUDetail, setPayUDetail] = useState({
    key: process.env.PAY_KEY,
    txnid: "",
    productinfo: "",
    amount: "",
    email: "",
    firstname: "",
    lastname: "",
    surl: process.env.HOST,
    furl: process.env.HOST,
    phone: "",
    hash: "",
  });

  const paymentTerms = useMemo(
    () => [
      "For Annual plans, the device should be in working condition",
      "By proceeding, you agree to the Terms of Service",
    ],
    []
  );

  const [acceptedTerms, setAcceptedTerms] = useState(paymentTerms.length);

  const isEnable = useMemo(() => {


    console.log("object1",paymentTerms.length,"locatopn01",location);
    console.log("object2",cartDetail.cartState,"locatopn02",customerDetail.phone);
    console.log("object3",customerDetail.personal,"locatopn03",Object.keys(customerDetail.slot).length );
    console.log("object4",Object.keys(cartItemsList).length);
    return acceptedTerms == paymentTerms.length &&
      cartDetail.cartState > 0 &&
      customerDetail.phone &&
      customerDetail.personal &&
      Object.keys(customerDetail.slot).length ===
        Object.keys(cartItemsList).length
      ? true
      : false;
  }, [
    acceptedTerms,
    cartDetail,
    location,
    customerDetail,
    cartItemsList,
    paymentTerms,
  ]);

 
  const createOrder = async (paymentMethod) => {
    
    let order = {
      paymentMethod: paymentMethod,
      cart: { ...cartDetail },
      customer: { ...customerDetail },
      longitude: location?.location?.lat,
      latitude: location?.location?.lng,
      city_id: location?.city_id,
      location_field: location?.location_field,
    };

    try {
      // api/payment/orders
      const result = await postDataWithUrl(
        `${process.env.HOST}/api/order/place`,
        order
      );
      console.log(result);
      if (!result) {
        alert("Server error. Are you online?");
        return;
      }
      dispatch(clearCart());
      if (!authToken && result.data.orderRes.user) {
        dispatch(login(result.data.orderRes.user));
      } else {
        if (authToken && !authInfo.address && result.data.orderRes.user) {
          dispatch(updateInfo(result.data.orderRes.user.info));
        }
      }

      if (paymentMethod === "online") {
        /* the test params provided by PayUMoney */
        const { orderRes, hash } = result.data;
        setPayUDetail((prevState) => ({
          ...prevState,
          txnid: orderRes?.transaction_id,
          productinfo: "Keyvendors Services",
          amount: order?.cart?.subtotal,
          email: orderRes?.user?.info.email
            ? orderRes?.user?.info?.email
            : "info@keyvendors.com",
          firstname: orderRes?.user?.info.name,
          lastname: "",
          phone: orderRes?.user?.info?.phone,
          hash: hash,
          surl: `${process.env.HOST}/order/confirm/${orderRes.transaction_id}`,
          furl: `${process.env.HOST}/order/confirm/${orderRes.transaction_id}`,
        }));
      } else {
        window.location.href = `/order/confirm/${result.data.orderRes.transaction_id}`;
      }
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        if (error.response?.data?.error) {
          toastMessage("error", error?.response?.data?.error?.message);
        } else {
          toastMessage("error", error?.response?.data?.message);
        }
        console.error(error);
      } else {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    if (payUDetail.hash) {
      form.current.submit();
    }
  }, [payUDetail]);
  const handleTermsChange = (e) => {
    if (e.target.checked) {
      setAcceptedTerms((prev) => prev + 1);
    } else {
      setAcceptedTerms((prev) => prev - 1);
    }
  };

  return (
    <CartAccordion id="payment-details" title="Payment Details">
      <List>
        {paymentTerms.map((value, index) => (
          <ListItem key={index}>
            <ListItemText>
              <FormControlLabel
                control={
                  <Checkbox
                    value={index}
                    onChange={handleTermsChange}
                    defaultChecked
                  />
                }
                label={value}
              />
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Grid justifyContent={"center"} alignItems="center" spacing={2} container>
        <Grid item>
          <form ref={form} action={process.env.PAY_URL} method="post">
            {Object.keys(payUDetail).map((v, i) => (
              <input key={i} type="hidden" name={v} value={payUDetail[v]} />
            ))}
          </form>
          <Button
            sx={{ borderRadius: 29, width: 250 }}
            size="large"
            variant="contained"
            disabled={isEnable}
            onClick={() => createOrder("online")}>
            Proceed to Payment
          </Button>
        </Grid>
        <Grid item>Or</Grid>
        <Grid item>
          <Button onClick={() => createOrder("cash")} disabled={isEnable}>
            Pay After Service
          </Button>
        </Grid>
      </Grid>
    </CartAccordion>
  );
}

export default CartPayment;
