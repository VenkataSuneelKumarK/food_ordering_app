import React from "react";
import foodsImage from "../../../assets/foodImage.jpg";
import classes from "./Header.module.scss";
import HeaderCartButton from "./HeaderCartButton";
const Header = props => {
    return (
        <>
            <header className={classes.header}>
                <h1>KVS Foods </h1>
                <HeaderCartButton onShowCart={props.onShowCart} />
            </header>
            <div className={classes.mainImage}>
                <img src={foodsImage} alt="Delicious good" />
            </div>
        </>
    );
};

export default Header;
