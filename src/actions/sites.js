// @flow
import { SERVER_URL } from "../constants/server";
import axios from "axios";

import {sites} from '../data/sites';
export const LOAD_SITES = 'LOAD_SITES';



axios.interceptors.request.use(function(config) {
    config.headers.Authorization = `Basic ${'czRoX3V4OmNvbXBhc3MwMA=='}`;
    config.withCredentials = true;
    return config
})


export function loadSites() {

    return async function(dispatch) {
        return await axios({
            url: `${SERVER_URL}/sap/opu/odata/sap/ZCM_MENUPLANNING_SRV/ZC_Sites`,
            method: 'GET',
        }).then(response => {


            return dispatch({
                type: LOAD_SITES,
                payload: response.data.d.results
            })
        }).catch(error => {
            return { data: [], error };
        });
            // return dispatch({
            //     type: LOAD_SITES,
            //     payload: sites
            // })

    };
}


