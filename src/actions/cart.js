
export const UPDATE_CART = 'UPDATE_CART';
export const LOAD_CART = 'LOAD_CART';


export function updateCart(data) {

    localStorage.setItem('cart', JSON.stringify(data));

    return async function(dispatch) {
        return dispatch({
            type: UPDATE_CART,
            payload: data
        })
    };

}
export function loadCart() {

    return async function(dispatch) {
        return dispatch({
            type: LOAD_CART,
            payload: JSON.parse(localStorage.getItem('cart'))
        })
    };

}




