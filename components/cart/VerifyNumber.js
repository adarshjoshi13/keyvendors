import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Box, Link } from "@mui/material";
import CartAccordion from "../style/CartAccordion";
import { postData } from "services/api";
import { SendToMobileSharp } from "@mui/icons-material";
import { Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSelector, useDispatch } from "react-redux";
import { addPhone, getCustomerPhone } from "../../store/cartSlice";
import { login, getAuthToken, getAuthInfo } from "../../store/authSlice";
import { toastMessage } from "utils/utility";
const VerifyNumber = React.memo(function VerifyNumberC(props) {
  const [otp, setOtp] = useState(null);
  const [disableOtp, setDisableOtp] = useState(true);
  const numberDetail = useSelector(getCustomerPhone);
  const [mobile, setMobile] = useState(numberDetail);
  const authToken = useSelector(getAuthToken);
  const authInfo = useSelector(getAuthInfo);
  const [verified, setVerified] = useState(
    authToken || numberDetail ? true : false
  );
  const [resendTimer, setResendTimer] = useState(15);

  const dispatch = useDispatch();

  const sendOtp = async () => {
    if (mobile.length == 10) {
      try {
        let res = await postData("otpverify/send", { phone: mobile });
        setDisableOtp(false);
        startTimer();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const validateOtp = async () => {
    if (mobile && otp) {
      try {
        let res = await postData("otp/validate", { phone: mobile, otp: otp });
        if (res.status === 1) {
          setVerified(true);
          dispatch(addPhone(mobile));

          if (res.user !== undefined) {
            dispatch(login(res.user));
          }
        } else {
          toastMessage("error", res.message);
        }
      } catch (error) {
        toastMessage("error", error);
        console.error(error);
      }
    }
  };

  const validateMobileNumber = (mobileNumber) => {
    const isValid = /^[6-9]\d{9}$/.test(mobileNumber); // Validates a 10-digit Indian mobile number
    if (isValid) {
      dispatch(addPhone(mobileNumber));
    } else {
      console.log("Invalid mobile number");
    }
  };

  const startTimer = () => {
    setResendTimer(resendTimer - 1);
    let interval = setInterval(() => {
      return setResendTimer((pr) => {
        if (pr === 0) {
          clearInterval(interval);
          return 15;
        } else {
          return pr - 1;
        }
      });
    }, 1000);
  };

  useEffect(() => {
    if (authToken) {
      dispatch(addPhone(authInfo.phone));
    }
  }, []);

  return (
    <CartAccordion id="verify-number" title="Enter your mobile number">
      <Grid>
        <Grid item>
          <TextField
            required
            size="small"
            label="Mobile number"
            onKeyUp={(e) => validateMobileNumber(e.target.value)}
          />
        </Grid>
      </Grid>
    </CartAccordion>
  );
  // return (
  //   <CartAccordion id="verify-number" title="Verify your mobile number">
  //     {verified ? (
  //       <Grid container spacing={12}>
  //         <Grid item>
  //           <Typography component="span" variant="body2">
  //             Mobile number verified
  //           </Typography>
  //         </Grid>
  //         <Grid item>
  //           <CheckCircleIcon style={{ color: "green" }} />
  //         </Grid>
  //       </Grid>
  //     ) : (
  //       <Grid
  //         sx={{
  //           display: "flex",
  //           justifyContent: { lg: "flex-start", xs: "center" },
  //           py: 2,
  //         }}
  //         spacing={3}
  //         container>
  //         <Grid item>
  //           <TextField
  //             required
  //             size="small"
  //             label="Mobile number"
  //             onChange={(e) => setMobile(e.target.value)}
  //             disabled={verified}
  //             InputLabelProps={{ shrink: true }}
  //           />
  //         </Grid>
  //         <Grid item>
  //           <TextField
  //             required
  //             size="small"
  //             label="Enter OTP here"
  //             disabled={disableOtp || verified}
  //             onChange={(e) => setOtp(e.target.value)}
  //             InputLabelProps={{ shrink: true }}
  //           />
  //         </Grid>
  //         <Grid item>
  //           <Button
  //             sx={{ borderRadius: 10, width: 200, textTransform: "none" }}
  //             size="large"
  //             variant="contained"
  //             onClick={() => (mobile && otp ? validateOtp() : sendOtp())}
  //             disabled={mobile && mobile.length == 10 ? false : true}>
  //             {disableOtp ? (
  //               <>
  //                 Send OTP
  //                 <SendToMobileSharp />
  //               </>
  //             ) : (
  //               "Submit"
  //             )}
  //           </Button>
  //         </Grid>
  //         {!disableOtp && (
  //           <Box sx={{ ml: 3 }}>
  //             <Typography component="p" variant="body2" color="green">
  //               OTP Sent
  //             </Typography>
  //             <Typography
  //               sx={{ fontSize: 10 }}
  //               component="p"
  //               variant="body2"
  //               color="green">
  //               {resendTimer == 15 ? (
  //                 <Link
  //                   component="button"
  //                   variant="body2"
  //                   onClick={() => sendOtp()}>
  //                   Click here to send again OTP
  //                 </Link>
  //               ) : (
  //                 `Resend In ${resendTimer}`
  //               )}
  //             </Typography>
  //           </Box>
  //         )}
  //       </Grid>
  //     )}
  //   </CartAccordion>
  // );
});

export default VerifyNumber;
