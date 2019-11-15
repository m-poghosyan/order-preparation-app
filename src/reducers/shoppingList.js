import {
    LOAD_SHOPING_LIST,
} from '../actions/shoppingList'
import moment from "moment";

const initialState = {
    shoppingList: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_SHOPING_LIST:
            action.payload.map((item, key) => item['key'] = key);

            return {
                ...state,
                shoppingList: action.payload,
            };
        default:
            return state;
    }
}
