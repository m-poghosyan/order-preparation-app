// @flow
import { SERVER_URL } from "../constants/server";
import axios from "axios";
import {data} from '../data/data';


// constants
export const LOAD_ORDER_PREP = 'LOAD_ORDER_PREP';


axios.interceptors.request.use(function(config) {
    config.headers.Authorization = `Basic ${'czRoX3V4OmNvbXBhc3MwMA=='}`;
    config.withCredentials = true;
    return config
});

export function loadOrderPrep(siteCode = 'F000') {

    return async function(dispatch) {

        return await axios({

            url: `${SERVER_URL}/sap/opu/odata/sap/ZCM_ORDERPREP_SRV/ZC_Needs?sap-client=120&$filter=IsActiveEntity%20eq%20true%20and%20(MenuPlanDate%20ge%20datetime%272019-05-18T00%3a00%3a00%27%20and%20MenuPlanDate%20le%20datetime%272019-06-25T00%3a00%3a00%27)%20and%20Site%20eq%20%27${siteCode}%27%20and%20HasDraftEntity%20eq%20false%20and%20OrderDocument%20eq%20%27%20%27`,
            method: 'GET',

        }).then(response => {

            return dispatch({
                type: LOAD_ORDER_PREP,
                payload: response.data.d.results
            })

        }).catch(error => {
            return { data: [], error };
        });
        // return dispatch({
        //     type: LOAD_ORDER_PREP,
        //     payload: data.d.results
        // })
    };

}
