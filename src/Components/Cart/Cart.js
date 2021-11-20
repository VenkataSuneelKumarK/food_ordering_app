import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import CartContext from "../../Store/cart-context";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import classes from "./Cart.module.scss";
import CartItem from "./CartItem/CartItem";
import Checkout from "./Checkout/Checkout";

const Cart = props => {
  const storeCartItems = useSelector(state => state.cartItems);
  const totalAmount = useSelector(state => state.totalAmount);
  const [isCheckout, setCheckout] = useState(false);
  const [isSubmitting, setSumbitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartContext = useContext(CartContext);
  const orderHandler = event => {
    setCheckout(true);
  };
  const submitOrderHandler = async userData => {
    setSumbitting(true);
    const response = await fetch("https://foodorder-e71c7-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartContext.items
      })
    }
    );
    if (!response.ok) {
      throw new Error("something went wrong");
    }
    setSumbitting(false);
    setDidSubmit(true);
    cartContext.clearCart();
    //const responseData = await response.json();
  };
  // const cartItems = cartContext.items.map(item => (
  //     <CartItem
  //         key={item.id}
  //         id={item.id}
  //         price={item.price}
  //         name={item.name}
  //         amount={item.amount}
  //         description={item.description}
  //     >
  //         {item.name}
  //     </CartItem>
  // ));
  const cartItems = storeCartItems.map(item => (<CartItem key={item.id}
    id={item.id}
    price={item.price}
    name={item.name}
    amount={item.amount}
    description={item.description} > {item.name} </CartItem>
  ));
  // const hasItems = cartContext.items.length > 0;
  const hasItems = storeCartItems.length > 0;
  const modalActions = (<div className={classes.actions} >
    <Button className={classes["button--alt"]}
      onClick={props.onCloseCart} >
      Close </Button> {
      hasItems && (<Button className={classes.button}
        onClick={orderHandler} >
        Order </Button>
      )
    } </div>
  );
  const cartModalContent = (<>
    <ul className={classes.cartItems} > {cartItems} </ul>
    <div className={classes.total} >
      <span> Total Amount </span>
      {/* < span > { cartContext.totalAmount } < /span > */}
      <span> {totalAmount} </span>
    </div> {
      isCheckout && (<Checkout onConfirm={submitOrderHandler}
        onCancel={props.onCloseCart} />
      )
    } {!isCheckout && modalActions}
  </>
  );
  const isSubmittingModalContent = <p> Sending order data... </p>;
  const didSubmitModalContent = (<>
    <p> Successfully sent the order! </p>
    <div className={classes.actions} >
      <button className={classes.button}
        onClick={props.onCloseCart} >
        Close </button>
    </div>
  </>
  );
  return (<Modal onClose={props.onCloseCart} > {!isSubmitting && !didSubmit && cartModalContent} {isSubmitting && isSubmittingModalContent} {!isSubmitting && didSubmit && didSubmitModalContent} </Modal>
  );
};

export default Cart;