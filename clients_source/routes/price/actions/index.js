import {
  FETCH_PRICE_BY_ID, FETCHING_LOADING, FBI_ERROR
} from '../consts';

import origin from '../../../common/origin';
import { read, update, destroy } from '../../../common/fetch';

export function fetchPriceById(id) {
  return async dispatch => {
    dispatch({
      type: FETCHING_LOADING,
      flag: true
    });

    let url = `${origin}/api/price/${id}/`;
    const response = await read(url);

    if (response.ok) {
      /**
       * Oh crap! I need to write some crutches to normal UX with float numbers.
       * I need to do transformation from umber to string on field cost of product
       * and discount of price's header
       */
      
      // Crutches start
      let data = JSON.parse(await response.json());
      data.discount = String(data.discount);
      data.products = data.products.map(product => {
        let isInteger = false;
        if (product.cost % 1 === 0) {
          isInteger = true;
        }
        product.cost = String(product.cost);
        if (isInteger) {
          product.cost = product.cost + '.0';
        }
        return product;
      });
      // Crutches end

      dispatch({
        type: FETCH_PRICE_BY_ID,
        data
      });
      dispatch({
        type: FETCHING_LOADING,
        flag: false
      });
    } else {
      dispatch({
        type: FETCHING_LOADING,
        flag: false
      });
      dispatch({
        type: FBI_ERROR
      });
    }
  }
}

import {
  EDIT_MODE_ON, EDIT_MODE_OFF
} from '../consts';

export function editModeOn(data) {
  return {
    type: EDIT_MODE_ON,
    data
  }
}

export function editModeOff() {
  return {
    type: EDIT_MODE_OFF
  }
}


import {
  WILL_REMOVE, REMOVING_LOADING, REMOVE,
  REMOVE_ERROR, REMOVING_SUCCESS
} from '../consts';

export function willRemove(flag) {
  return {
    type: WILL_REMOVE,
    flag
  }
}

export function remove(id) {
  return async dispatch => {
    dispatch({
      type: REMOVING_LOADING,
      flag: true
    });

    const url = `${origin}/api/price/${id}/`;
    let response = await destroy(url);

    console.log('response', response);
    if (response.ok) {
      dispatch({
        type: REMOVING_LOADING,
        flag: false
      });
      dispatch({
        type: REMOVING_SUCCESS
      });
      console.log('result', await response.json());
    } else {
      dispatch({
        type: REMOVING_LOADING,
        flag: false
      });
      dispatch({
        type: REMOVE_ERROR
      });
    }
  }
}

import { RESET_PRICE_VIEW } from '../consts';

export function resetPriceView() {
  return {
    type: RESET_PRICE_VIEW
  }
}

import {
  MAKE_INPUT, REMOVE_INPUT, CHANGE_PRODUCT_FIELD, CHANGE_MAIN_FIELD, INPUT_INSERT_ERROR,
  CREATE_NEW_PRODUCT, REMOVE_NEW_PRODUCT
} from '../consts';

export function makeInput(id, field) {
  return {
    type: MAKE_INPUT,
    id,
    field
  }
};

export function removeInput() {
  return {
    type: REMOVE_INPUT
  }
}

export function inputInsertError(flag = true) {
  return {
    type: INPUT_INSERT_ERROR,
    flag
  }
}

export function changeProductField(id, field, value) {
  return {
    type: CHANGE_PRODUCT_FIELD,
    id,
    field,
    value
  }
}

export function changeMainField(field, value) {
  return {
    type: CHANGE_MAIN_FIELD,
    field,
    value
  }
}

export function createNewProduct() {
  return {
    type: CREATE_NEW_PRODUCT
  }
}

export function removeNewProduct(id) {
  return {
    type: REMOVE_NEW_PRODUCT,
    id
  }
}

import {
  REMOVE_PRODUCT, CANCEL_REMOVING_PRODUCT
} from '../consts';

export function removeProduct(id) {
  return {
    type: REMOVE_PRODUCT,
    id
  }
}

export function cancelRemovingProduct(id) {
  return {
    type: CANCEL_REMOVING_PRODUCT,
    id
  }
}

import {
  UPDATING_LOADING,
  PRICE_UPDATING_ERROR,
  PRICE_UPDATING_SUCCESS
} from '../consts';

export function updatePrice(id, data) {
  return async dispatch => {
    dispatch({
      type: UPDATING_LOADING,
      flag: true
    });

    let url = `${origin}/api/price/${id}/`;
    const response = await update(url, data);


    if (response.ok) {
      dispatch({
        type: UPDATING_LOADING,
        flag: false
      });
      dispatch({
        type: PRICE_UPDATING_SUCCESS,
        data
      });
    } else {
      let result = await response.json();
      dispatch({
        type: UPDATING_LOADING,
        flag: false
      });
      dispatch({
        type: PRICE_UPDATING_ERROR,
        message: result
      })
    }
  }
}

import {
  SET_COUNTERS
} from '../consts';

export function setCounters(counters) {
  return {
    type: SET_COUNTERS,
    counters
  }
}
