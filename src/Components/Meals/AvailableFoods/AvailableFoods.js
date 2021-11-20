import React, { useEffect, useState } from "react";
import Card from "../../Layout/Card/Card";
import classes from "./AvailableFoods.module.scss";
import MealItem from "../MealItem/MealItem";
/*const foods = [
    {
        id: "f1",
        name: "Paratha",
        description: "F1",
        price: 25,
        chef: "Anusha"
    },
    {
        id: "f2",
        name: "Butter Paratha",
        description: "F2",
        price: 30,
        chef: "Anusha"
    },
    {
        id: "f3",
        name: "Kulcha",
        description: "F3",
        price: 40,
        chef: "Anusha"
    },
    {
        id: "f4",
        name: "Stuffed Kulcha",
        description: "F4",
        price: 50,
        chef: "Anusha"
    }
];*/

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  useEffect(() => {
    const fetchFoods = async () => {
      //setLoading(true);  --> not required as we initialized with true and this effect run only once
      const response = await fetch("https://foodorder-e71c7-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json");

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();
      const loadedFoods = [];
      for (let key in responseData) {
        loadedFoods.push({
          id: key,
          ...responseData[key]
        });
      }
      setFoods(loadedFoods);
      setLoading(false);
    };

    fetchFoods().catch(error => {
      setError(true);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return (<
            section className={classes.foodsLoading} >
      <
            p > Loading... < /p> <
            /section>
        );
    }

        if (isError) {
        return ( <
            section className={classes.error} >
          <
            p > Something went wrong, Please
            try again later < /p> <
            /section>
            );
    }

    const foodsList = foods.map(food => ( <
              MealItem key={food.id}
              id={food.id}
              name={food.name}
              description={food.description}
              price={food.price}
              chef={food.chef}
            />
            ));
            return ( <
        section className={classes.availableFoods} >
              <
        Card >
                <
        ul > {foodsList} < /ul> <
        /Card> <
        /section>
                  );
};

                  export default AvailableFoods;