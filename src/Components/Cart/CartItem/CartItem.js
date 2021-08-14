import React, { useContext } from "react";
import CartContext from "../../../Store/cart-context";
import classes from "./CartItem.module.scss";
const CartItem = props => {
    const price = `${props.price.toFixed(2)} /-`;
    const cartContext = useContext(CartContext);
    return (
        <li className={classes.cartItem}>
            <h3>{props.name}</h3>
            <div className={classes.summary}>
                <span className={classes.price}>{price}</span>
                <span className={classes.amount}>x {props.amount}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={cartContext.removeItem.bind(null, props.id)}>
                    {" "}
          -{" "}
                </button>
                <button
                    onClick={cartContext.addItem.bind(null, {
                        id: props.id,
                        name: props.name,
                        description: props.description,
                        price: +props.price,
                        amount: 1
                    })}
                >
                    {" "}
          +{" "}
                </button>
            </div>
        </li>
    );
};

export default CartItem;
