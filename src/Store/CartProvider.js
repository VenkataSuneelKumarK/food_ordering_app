import CartContext from "./cart-context";

import React, { useReducer } from "react";
import { useDispatch } from "react-redux";

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const totalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItem;
    let updatedItems;
    if (existingCartItem) {
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItem = { ...action.item };
      updatedItems = state.items.concat(action.item);
    }
    return { ...state, items: updatedItems, totalAmount: totalAmount };
  } else if (action.type === "REMOVE_ITEM") {
    /*const itemToRemove = state.items.filter(item => item.id === action.id);
      const totalAmount = state.totalAmount - itemToRemove[0].price;
      let updatedItems = [];
      if (itemToRemove[0].amount === 1) {
          updatedItems = state.items.filter(item => item.id !== action.id);
      } else {
          updatedItems = state.items.map(item => {
              if (item.id === action.id) {
                  item.amount -= 1;
              }
              return item;
          });
      }
      return { items: updatedItems, totalAmount: totalAmount };
    */
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  } else if (action.type === "CLEAR_CART") {
    return {
      items: [],
      totalAmount: 0
    };
  }

  console.log("ADD_ITEM::::last", state);
  return { ...state };
};

const CartProvider = props => {
  // const [cartState, cartDispatch] = useReducer(cartReducer, defaultCartState);
  const [cartState] = useReducer(cartReducer, defaultCartState);
  const dispatch = useDispatch();
  const addItemToCartHandler = item => {
    console.log("item", item);
    // cartDispatch({ type: "ADD_ITEM", item: item });
    dispatch({ type: "ADD_ITEM", item: item });
  };

  const removeItemFromCartHandler = id => {
    console.log("id", id);
    // cartDispatch({ type: "REMOVE_ITEM", id: id });
    dispatch({ type: "REMOVE_ITEM", id: id });
  };

  const clearCartHandler = () => {
    console.log("clear cart");
    // cartDispatch({ type: "CLEAR_CART" });
    dispatch({ type: "CLEAR_CART" });
  };
  const cartContext = {
    items: [...cartState.items],
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };
  return (<CartContext.Provider value={cartContext} > {props.children} </CartContext.Provider>
  );
};

export default CartProvider;