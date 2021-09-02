import { createStore } from 'redux';

const initialState = {
    numberOfCartItems: 0,
    cartItems: [],
    totalAmount: 0,
    availableItems: []
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_ITEM': {
            const totalAmount =
                state.totalAmount + action.item.price * action.item.amount;
            const existingCartItemIndex = state.cartItems.findIndex(
                item => item.id === action.item.id
            );
            const existingCartItem = state.cartItems[existingCartItemIndex];
            let updatedItem;
            let updatedItems;
            if (existingCartItem) {
                updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.item.amount
                };
                updatedItems = [...state.cartItems];
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                updatedItem = { ...action.item };
                updatedItems = state.cartItems.concat(action.item);
            }
            console.log("reducer:", { ...state, cartItems: updatedItems, totalAmount: totalAmount });
            return { ...state, cartItems: updatedItems, totalAmount: totalAmount };

        }
        case 'REMOVE_ITEM': {
            const existingCartItemIndex = state.cartItems.findIndex(
                item => item.id === action.id
            );
            const existingItem = state.cartItems[existingCartItemIndex];
            const updatedTotalAmount = state.totalAmount - existingItem.price;
            let updatedItems;
            if (existingItem.amount === 1) {
                updatedItems = state.cartItems.filter(item => item.id !== action.id);
            } else {
                const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
                updatedItems = [...state.cartItems];
                updatedItems[existingCartItemIndex] = updatedItem;
            }

            return {
                ...state,
                cartItems: updatedItems,
                totalAmount: updatedTotalAmount
            };
        }
        case 'CLEAR_CART': {
            return {
                ...state,
                cartItems: [],
                totalAmount: 0
            };
        }
        case 'AVAILABLE_ITEMS':
            return { ...state, availableItems: action.payload };
        default:
            return state;
    };
}

const store = createStore(reducer);

export default store;