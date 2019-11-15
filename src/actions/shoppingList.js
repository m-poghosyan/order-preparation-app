// @flow
import { SERVER_URL } from "../constants/server";
import axios from "axios";


// constants
export const LOAD_SHOPING_LIST= 'LOAD_SHOPING_LIST';


axios.interceptors.request.use(function(config) {
    config.headers.Authorization = `Basic ${'czRoX3V4OmNvbXBhc3MwMA=='}`;
    config.withCredentials = true;
    return config
})

export function loadShoppingList() {

    return async function(dispatch) {

        return await axios({

            url: `${SERVER_URL}/sap/opu/odata/sap/ZCM_ORDERPREP_SRV/ZC_CShoppingList`,
            method: 'GET',

        }).then(response => {

            return dispatch({
                type: LOAD_SHOPING_LIST,
                payload: response.data.d.results
            })

        }).catch(error => {
            return { data: [], error };
        });
    };
}
