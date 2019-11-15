// @flow
import {TabList} from '../constants/tabs';
export const LOAD_TABS = 'LOAD_TABS';

export function loadTabs() {

    return async function(dispatch) {
        return dispatch({
            type: LOAD_TABS,
            payload: TabList
        })
    };
}


