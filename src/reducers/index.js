import { combineReducers } from "redux";
import sites from "./sites";
import orderPrep from "./orderPrep";
import cart from "./cart";
import shoppingList from "./shoppingList";
import tabs from "./tabs";


const combine = combineReducers({
    sites,
    orderPrep,
    cart,
    shoppingList,
    tabs,
});

export default combine;
