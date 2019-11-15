import {
    UPDATE_CART,
    LOAD_CART
} from '../actions/cart'

const initialState = {
    cart: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_CART:
            return {
                ...state,
                cart: action.payload,
            };
        case LOAD_CART:
            return {
                ...state,
                cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
            };
        default:
            return state;
    }
}
