import React, { useState } from "react";
import classes from "./App.module.scss";
import Cart from "./Components/Cart/Cart";

import Header from "./Components/Layout/Header/Header";
import Meals from "./Components/Meals/Meals";
import CartProvider from "./Store/CartProvider";

function App() {
    const [showCart, setShowCart] = useState(false);

    const showCartHandler = () => {
        setShowCart(true);
    };

    const hideCartHandler = () => {
        setShowCart(false);
    };

    return (
        <div className={classes.KVS_Food}>
            <CartProvider>
                {showCart && <Cart onCloseCart={hideCartHandler} />}
                <Header onShowCart={showCartHandler} />
                <Meals />
            </CartProvider>
        </div>
    );
}

export default App;
