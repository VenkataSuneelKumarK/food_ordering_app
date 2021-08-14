import React, { useRef, useState } from "react";
import InputWithLabel from "../../UI/InputWithLabel/InputWithLabel";
import Button from "../../UI/Button/Button";
import classes from "./MealForm.module.scss";

const MealForm = props => {
    const [isAmountValid, setAmountValid] = useState(true);
    const inputRef = useRef();
    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = inputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (
            enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 1 ||
            enteredAmountNumber > 5
        ) {
            setAmountValid(false);
            return;
        } else {
            setAmountValid(true);
        }
        props.onAddToCart(enteredAmountNumber);
    };
    return (
        <form className={classes.mealForm} onSubmit={submitHandler}>
            <InputWithLabel
                ref={inputRef}
                label="Amount"
                input={{
                    type: "number",
                    id: props.id + "_number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                    value: props.value
                }}
            />
            <Button type="submit">+ Add</Button>
            {!isAmountValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    );
};

export default MealForm;
