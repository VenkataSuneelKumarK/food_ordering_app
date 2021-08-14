import React, { useEffect, useState } from "react";

import classes from "./MealsSummary.module.scss";

const MealsSummary = () => {
    console.log("MealsSummary");
    const [summary, setSummary] = useState("abc");
    useEffect(
        () => {
            console.log("MealsSummary:effect:before:1");
            setSummary(prevState => {
                console.log("prevState:1", prevState);
                return "def";
            });
            console.log("MealsSummary:effect:before:2");
            setSummary(prevState => {
                console.log("prevState:2", prevState);
                return "ghi";
            });
        },
        [summary]
    );
    return (
        <section className={classes.mealSummary}>
            <h2>Delicious Food, Delivered To You</h2>
            <p>Choose your favorite Food</p>
            {/*{summary}*/}
            <p>
                All our foods are cooked with high-quality ingredients, just-in-time and
                of course by experienced chefs!
      </p>
        </section>
    );
};

export default MealsSummary;
