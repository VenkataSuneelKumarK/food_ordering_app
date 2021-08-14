import React, { useContext } from "react";
import MealForm from "../MealForm/MealForm";
import classes from "./MealItem.module.scss";
import CartContext from "../../../Store/cart-context";
const MealItem = props => {
    const cartContext = useContext(CartContext);
    const addToCartHandler = amount => {
        cartContext.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });
    };
    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{props.price} /- </div>
                <div className={classes.chef}>Chef: {props.chef} </div>
            </div>
            <div>
                <MealForm id={props.id} onAddToCart={addToCartHandler} />
            </div>
        </li>
    );
};

export default MealItem;
