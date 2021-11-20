// import React, { useContext, useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./HeaderCartButton.module.scss";
import CartIcon from "./CartIcon";
// import CartContext from "../../../Store/cart-context";

const HeaderCartButton = props => {
  const cartItems = useSelector(state => state.cartItems);
  // const cartContext = useContext(CartContext);
  const [isBtnHighlighted, setBtnHighlight] = useState(false);
  // let numberOfCartItems = cartContext.items.reduce((curNumber, item) => {
  //     return curNumber + item.amount;
  // }, 0);

  let numberOfCartItems = cartItems.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  useEffect(
    () => {
      console.log("useEffect");
      if (numberOfCartItems === 0) {
        return;
      }
      let timer;
      if (!isBtnHighlighted) {
        console.log("isBtnHighlighted", isBtnHighlighted);
        setBtnHighlight(true);

        timer = setTimeout(() => {
          setBtnHighlight(false);
        }, 300);
      }

      return () => {
        clearTimeout(timer);
      };
    },
    [numberOfCartItems]
  );
  const btnClasses = `${classes.button} ${isBtnHighlighted ? classes.bump : ""
    }`;
  return (
    <button className={btnClasses} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
