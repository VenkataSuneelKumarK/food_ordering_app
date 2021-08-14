import React from "react";

import AvailableFoods from "./AvailableFoods/AvailableFoods";
import MealsSummary from "./MealsSummary/MealsSummary";

const Meals = props => {
    return (
        <>
            <MealsSummary />
            <AvailableFoods />
        </>
    );
};

export default Meals;
