import React from "react";

import classes from "./InputWithLabel.module.scss";
const InputWithLabel = React.forwardRef((props, ref) => {
    return (
        <div className={classes.labeledInput}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input} />
        </div>
    );
});

export default InputWithLabel;
