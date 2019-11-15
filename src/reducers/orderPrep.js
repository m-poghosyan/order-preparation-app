import {
    LOAD_ORDER_PREP,
} from '../actions/orderPrep'

import moment from "moment";

const initialState = {
    orderPrep: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_ORDER_PREP:

            action.payload.map((item, key) => {
                item['key'] = key;
                item['Price'] = parseFloat(item['Price']).toFixed(2);
                item['ArticleNumber'] = item['MaterialCode'];

                return item['OrderDate'] = item['OrderDate'] ?  moment(parseInt(item['OrderDate'].replace(/\D/g, ''))).format("DD-MM-YYYY") : '15.09.2019';
            });

            return {
                ...state,
                orderPrep: action.payload,
            };
        default:
            return state;
    }
}
