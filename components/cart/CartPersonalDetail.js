import React, { useCallback, useEffect, useMemo, useState } from "react";
import CartAccordion from "../style/CartAccordion";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { addPersonal, getCustomerPersonal } from "../../store/cartSlice";
import { getAuthInfo } from "../../store/authSlice";
import CartPersonalInfo from "components/cart/CartPersonalInfo";
import { width } from "@mui/system";

function PersonalDetail({ isAddressEdit, handleUpdate }) {
  const dispatch = useDispatch();
  const customerPersonal = useSelector(getCustomerPersonal);
  const authInfo = useSelector(getAuthInfo);
  const [submitted, setSubmitted] = useState(customerPersonal ? true : false);
  const [formValues, setFormValues] = useState({
    name: {
      value: authInfo
        ? authInfo.name
        : customerPersonal
        ? customerPersonal.name
        : "",
      error: false,
      required: true,
      errorMessage: "You must enter a name",
    },
    email: {
      value: authInfo
        ? authInfo.email
        : customerPersonal
        ? customerPersonal.email
        : "",
      error: false,
      required: false,
      errorMessage: "You must enter an email",
    },
    pincode: {
      value: customerPersonal
        ? customerPersonal.pincode
        : authInfo
        ? authInfo.pincode
        : "",
      error: false,
      required: true,
      errorMessage: "You must enter Pin code",
    },
    address: {
      value: customerPersonal
        ? customerPersonal.address
        : authInfo
        ? authInfo.address
        : "",
      error: false,
      required: true,
      errorMessage: "You must choose address",
    },
    city: {
      value: customerPersonal
        ? customerPersonal.city
        : authInfo
        ? authInfo.city
        : "",
      error: false,
      required: true,
      errorMessage: "You must choose City",
    },
    landmark: {
      value: customerPersonal
        ? customerPersonal.landmark
        : authInfo
        ? authInfo.landmark
        : "",
      error: false,
      required: false,
      errorMessage: "You must choose landmark",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value,
      },
    }));

    isDisabled();
  };
  const isDisabled = () => {
    let entries = Object.entries(formValues)
      .map((item) => {
        if (item[1].required) {
          if (item[1].value) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      })
      .filter((value) => value);

    return entries.length > 0 ? true : false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let values = {};
    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };

    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;
      values = {
        ...values,
        [currentField]: currentValue,
      };
      if (currentValue === "") {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: true,
          },
        };
      }
    }
    setFormValues(newFormValues);

    if (isAddressEdit) {
      handleUpdate(values);
    } else {
      dispatch(addPersonal(values));
      setSubmitted(true);
    }
  };
  const updateForm = () => {
    setSubmitted(false);
  };

  useEffect(() => {
    if (authInfo) {
      if (authInfo.address) {
        dispatch(addPersonal(authInfo));
      }
      Object.keys(formValues).forEach((value) => {
        let e = {
          target: { name: value, value: authInfo[value] },
        };
        handleChange(e);
      });
    }
  }, [authInfo]);

  const mainGridLgSize = isAddressEdit ? 12 : 8;
  return (
    <>
      {!submitted || isAddressEdit ? (
        <form noValidate onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent={"center"}
            sx={{ py: 4, display: "flex" }}>
            <Grid
              sm={12}
              xs={12}
              md={12}
              lg={mainGridLgSize}
              sx={{ display: "flex" }}
              item>
              <Grid
                sx={{ display: "flex" }}
                spacing={3}
                direction="row"
                container>
                {!isAddressEdit && (
                  <>
                    <Grid sm={12} xs={12} lg={6} item>
                      <TextField
                        size="small"
                        required
                        label="Name"
                        name="name"
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        error={formValues.name.error}
                        disabled={authInfo && authInfo.name ? true : false}
                        helperText={
                          formValues.name.error && formValues.name.errorMessage
                        }
                        value={
                          formValues.name.value ? formValues.name.value : ""
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid sm={12} xs={12} lg={6} item>
                      <TextField
                        size="small"
                        label="Email"
                        name="email"
                        fullWidth
                        onChange={handleChange}
                        error={formValues.email.error}
                        value={
                          formValues.email.value ? formValues.email.value : ""
                        }
                        disabled={authInfo && authInfo.email ? true : false}
                        helperText={
                          formValues.email.error &&
                          formValues.email.errorMessage
                        }
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </>
                )}
                <Grid sm={12} xs={12} lg={6} item>
                  <TextField
                    size="small"
                    required
                    name="pincode"
                    label="Pincode"
                    onChange={handleChange}
                    error={formValues.pincode.error}
                    value={
                      formValues.pincode.value ? formValues.pincode.value : ""
                    }
                    helperText={
                      formValues.pincode.error &&
                      formValues.pincode.errorMessage
                    }
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
                <Grid sm={12} xs={12} lg={6} item>
                  <TextField
                    size="small"
                    required
                    name="city"
                    label="City/State"
                    onChange={handleChange}
                    error={formValues.city.error}
                    value={formValues.city.value ? formValues.city.value : ""}
                    helperText={
                      formValues.city.error && formValues.city.errorMessage
                    }
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
                <Grid sm={12} xs={12} lg={6} item>
                  <TextField
                    size="small"
                    required
                    name="address"
                    label="Service Address"
                    onChange={handleChange}
                    error={formValues.address.error}
                    value={
                      formValues.address.value ? formValues.address.value : ""
                    }
                    helperText={
                      formValues.address.error &&
                      formValues.address.errorMessage
                    }
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
                <Grid sm={12} xs={12} lg={6} item>
                  <TextField
                    size="small"
                    label="Landmark"
                    name="landmark"
                    error={formValues.landmark.error}
                    value={
                      formValues.landmark.value ? formValues.landmark.value : ""
                    }
                    helperText={
                      formValues.landmark.error &&
                      formValues.landmark.errorMessage
                    }
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              sm={12}
              xs={12}
              lg={mainGridLgSize}
              sx={{ display: "flex" }}
              justifyContent="center"
              item>
              <Button
                type="submit"
                sx={{ borderRadius: 10, width: 200, textTransform: "none" }}
                size="large"
                variant="contained"
                disabled={isDisabled()}>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <CartPersonalInfo
          details={{
            name: formValues.name.value,
            email: formValues.email.value,
            address: `${formValues.address.value},${formValues.city.value}(${formValues.pincode.value}),
          ${formValues.landmark.value}`,
          }}
          isEdit={true}
          handleEdit={() => updateForm()}
        />
      )}
    </>
  );
}

const CartPersonalDetail = ({ isAddressEdit, handleUpdate }) => (
  <>
    {isAddressEdit ? (
      <PersonalDetail
        isAddressEdit={isAddressEdit}
        handleUpdate={handleUpdate}
      />
    ) : (
      <CartAccordion id="personal-details" title="Enter personal details">
        <PersonalDetail />
      </CartAccordion>
    )}
  </>
);

export default CartPersonalDetail;
