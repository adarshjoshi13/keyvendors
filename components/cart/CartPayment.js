
import { useDispatch, useSelector } from "react-redux";
import { postDataWithUrl, fetchPeymantOptions, verifyPeyment} from "services/api";
import { getAuthToken, getAuthInfo, login, updateInfo } from "store/authSlice";
import { cartData, clearCart, getCustomerDetail } from "store/cartSlice";
import { getLocation } from "store/locationSlice";
import { toastMessage } from "utils/utility";
import CartAccordion from "../style/CartAccordion";
import logo from "../../public/assets/logos/logo1.png";
import { useState, useMemo, useRef, useEffect } from "react";
import { Button, Grid, List, ListItem, ListItemText, Checkbox, FormControlLabel } from "@mui/material";


function CartPayment({ cartItemsList }) {
  const cartDetail = useSelector(cartData);
  const customerDetail = useSelector(getCustomerDetail);
  const authToken = useSelector(getAuthToken);
  const location = useSelector(getLocation);
  const authInfo = useSelector(getAuthInfo);
  const dispatch = useDispatch();
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [acceptedTerms, setAcceptedTerms] = useState(0);

  // Fetch payment options
  const fetchPaymentOptions = async () => {
    try {
      const response = await fetchPeymantOptions("paymentmode");
      if (response.status === 200 && response.data) {
        setPaymentOptions(response.data);
      } else {
        console.error("Failed to fetch payment options:", response.status);
      }
    } catch (error) {
      console.error("Error fetching payment options:", error);
    }
  };

  // Payment terms and validation
  const paymentTerms = useMemo(
    () => [
      "For Annual plans, the device should be in working condition",
      "By proceeding, you agree to the Terms of Service",
    ],
    []
  );

  const isEnable = useMemo(() => {
    return (
      acceptedTerms === paymentTerms.length &&
      cartDetail.cartState > 0 &&
      customerDetail.phone &&
      customerDetail.personal &&
      Object.keys(customerDetail.slot).length === Object.keys(cartItemsList).length
    );
  }, [acceptedTerms, cartDetail, customerDetail, cartItemsList, paymentTerms]);

  // Create order and initiate payment
  const createOrder = async (paymentMethod) => {
    const order = {
      paymentMethod,
      cart: { ...cartDetail },
      customer: { ...customerDetail },
      longitude: location?.location?.lat,
      latitude: location?.location?.lng,
      city_id: location?.city_id || location,
      location_field: location?.location_field || location.slug,
    };
    
    
    // console.log('location:', location);
    // return false;

    // console.log('location:', location);
    // return false;
    try {
      const result = await postDataWithUrl(`${process.env.HOST}/api/order/place`, order);

      if (!result) {
        alert("Server error. Are you online?");
        return;
      }

      // Update auth info
      if (!authToken && result.data.user) {
        dispatch(login(result.data.user));
      } else if (authToken && !authInfo.address && result.data.user) {
        dispatch(updateInfo(result.data.user.info));
      }

      if (paymentMethod === "online") {
        const orderId = result?.data?.transaction_id || `TXN${new Date().getTime()}`;
        const amount = order.cart?.subtotal || 10;
        const name = result?.data?.user?.info?.name || "Default User";
        const email = result?.data?.user?.info?.email || "info@keyvendors.com";
        const phone = result?.data?.user?.info?.phone || "9999111111";
        const options = {
          key: 'rzp_live_KML2JenKCfSplm',
          amount: parseFloat(amount) * 100, //  = INR 1
          // amount: 1 * 100, //  = INR 1
          name: 'Keyvenders',
          description: 'some description',
          image: logo,
          handler: function(response) {
              alert(response.razorpay_payment_id);
              window.location.href = `/order/confirm/${result.data.transaction_id}`;
          },
          prefill: {
              name: name,
              contact: phone,
              email: email
          },
          notes: {
              address: 'some address'
          },
          theme: {
              color: 'blue',
              hide_topbar: false
          }
      };
        
        // Initialize Razorpay and handle errors
        if (typeof window.Razorpay === "undefined") {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => {
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
          };
          script.onerror = () => {
            alert("Failed to load Razorpay. Please try again.");
          };
          document.body.appendChild(script);
        } else {
          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
        }
        
      } else {
        window.location.href = `/order/confirm/${result.data.transaction_id}`;
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toastMessage("error", "Failed to create order. Please try again.");
    }
  };

  // Effect to fetch payment options
  useEffect(() => {
    fetchPaymentOptions();
  }, []);

  const handleTermsChange = (e) => {
    setAcceptedTerms((prev) => (e.target.checked ? prev + 1 : prev - 1));
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
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
      {paymentOptions.some((option) => Number(option.ispayment_option) === 1) ? (
        <Grid item>
          {/* <form ref={form} action={process.env.PAY_URL} method="post">
            {Object.keys(payUDetail).map((key, i) => (
              <input key={i} type="hidden" name={key} value={payUDetail[key]} />
            ))}
          </form> */}
          <Button
            sx={{ borderRadius: 29, width: 250 }}
            size="large"
            variant="contained"
            onClick={() => createOrder("online")}
          >
            Proceed to Payment
          </Button>
        </Grid>
      ) : paymentOptions.some((option) => Number(option.ispayment_option) === 2) ? (
         <Grid item>
         <Button 
          sx={{ borderRadius: 29, width: 250 }}
          size="large"
          variant="contained"
         onClick={() => createOrder("cash")}>
           Pay After Service 
         </Button>
       </Grid>
      ) : (
        <>
          <Grid item>
            {/* <form ref={form} action={process.env.PAY_URL} method="post">
              {Object.keys(payUDetail).map((key, i) => (
                <input key={i} type="hidden" name={key} value={payUDetail[key]} />
              ))}
            </form> */}
            <Button
              sx={{ borderRadius: 29, width: 250 }}
              size="large"
              variant="contained"
              onClick={() => createOrder("online")}
            >
              Proceed to Payment
            </Button>
          </Grid>
          <Grid item>Or</Grid>
          <Grid item>
            <Button onClick={() => createOrder("cash")}>
              Pay After Service
            </Button>
          </Grid>
        </>
      )}
      </Grid>
    </CartAccordion>
  );
}
export default CartPayment;

