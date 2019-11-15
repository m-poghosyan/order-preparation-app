import {
    LOAD_TABS,
} from '../actions/tabs'

const initialState = {
    tabs: [],
};

export default function (state = initialState, action) {

    switch (action.type) {
        case LOAD_TABS:
            return {
                ...state,
                tabs: action.payload,
            };
        default:
            return state;
    }

}
