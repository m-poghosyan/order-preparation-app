import {
    LOAD_SITES,
} from '../actions/sites'

const initialState = {
  sites: [],
};

export default function site(state = initialState, action) {

    switch (action.type) {
    case LOAD_SITES:
        return {
        ...state,
        sites: action.payload,
      };
    default:
      return state;
  }
}
