import React, { useRef, useState } from "react";
import classes from "./Checkout.module.scss";

const isEmpty = value => value.trim() === "";
const isNChars = (value, n) => value.trim().length === n;

const Checkout = props => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
    mobileNum: true
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const postalInputRef = useRef();
  const mobileNumInputRef = useRef();
  const confirmHandler = event => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredMobileNum = mobileNumInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isNChars(enteredPostal, 6);
    const enteredMobileNumIsValid = isNChars(enteredMobileNum, 10);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid,
      mobileNum: enteredMobileNumIsValid
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid &&
      enteredMobileNumIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postal: enteredPostal,
      mobileNum: enteredMobileNum
    });
  };
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.formField} ${formInputsValidity.name ? "" : classes.invalid
          }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div
        className={`${classes.formField} ${formInputsValidity.street ? "" : classes.invalid
          }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div
        className={`${classes.formField} ${formInputsValidity.city ? "" : classes.invalid
          }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div
        className={`${classes.formField} ${formInputsValidity.postal ? "" : classes.invalid
          }`}
      >
        <label htmlFor="postal">Postal</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValidity.postal && (
          <p>Please enter a valid postal code(6 characters long) !</p>
        )}
      </div>
      <div
        className={`${classes.formField} ${formInputsValidity.mobileNum ? "" : classes.invalid
          }`}
      >
        <label htmlFor="mobileNum">Mobile Number</label>
        <input type="text" id="mobileNum" ref={mobileNumInputRef} />
        {!formInputsValidity.mobileNum && (
          <p>Please enter a valid mobile num(10 digits)!</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
