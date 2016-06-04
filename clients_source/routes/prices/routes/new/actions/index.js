import origin from '../../../../../common/origin';
import { create } from '../../../../../common/fetch';

import { RESET_PRICE_VIEW_IN_NEW } from '../consts';

export function resetPriceView() {
  return {
    type: RESET_PRICE_VIEW_IN_NEW
  }
}

import {
  MAKE_INPUT_IN_NEW, REMOVE_INPUT_IN_NEW,
  CHANGE_PRODUCT_FIELD_IN_NEW, CHANGE_MAIN_FIELD_IN_NEW,
  INPUT_INSERT_ERROR_IN_NEW,
  CREATE_NEW_PRODUCT_IN_NEW, REMOVE_NEW_PRODUCT_IN_NEW
} from '../consts';

export function makeInput(id = null, field) {
  return {
    type: MAKE_INPUT_IN_NEW,
    id,
    field
  }
};

export function removeInput() {
  return {
    type: REMOVE_INPUT_IN_NEW
  }
}

export function inputInsertError(flag = true) {
  return {
    type: INPUT_INSERT_ERROR_IN_NEW,
    flag
  }
}

export function changeProductField(id, field, value) {
  return {
    type: CHANGE_PRODUCT_FIELD_IN_NEW,
    id,
    field,
    value
  }
}

export function changeMainField(field, value) {
  return {
    type: CHANGE_MAIN_FIELD_IN_NEW,
    field,
    value
  }
}

export function createNewProduct() {
  return {
    type: CREATE_NEW_PRODUCT_IN_NEW
  }
}

export function removeNewProduct(id) {
  return {
    type: REMOVE_NEW_PRODUCT_IN_NEW,
    id
  }
}

import {
  CREATING_LOADING,
  PRICE_CREATING_ERROR,
  PRICE_CREATING_SUCCESS
} from '../consts';

export function createPrice(data) {
  return async dispatch => {
    dispatch({
      type: CREATING_LOADING,
      flag: true
    });

    /**
     * Oh crap! I need to write some crutches to normal UX with float numbers.
     * I need to do transformation from umber to string on field cost of product
     * and discount of price's header
     */

     // Crutches start
     data = JSON.parse(JSON.stringify(data));
     data.discount = Number(data.discount);
     delete data._id;
     data.products = data.products.map(product => {
      delete product._id;
      product.cost = Number(product.cost);
      return product;
     });

    let url = `${origin}/api/price/`;
    const response = await create(url, data);

    if (response.ok) {
      dispatch({
        type: CREATING_LOADING,
        flag: false
      });
      dispatch({
        type: PRICE_CREATING_SUCCESS,
        data: JSON.parse(await response.json())
      });
    } else {
      let result = await response.json();
      dispatch({
        type: CREATING_LOADING,
        flag: false
      });
      dispatch({
        type: PRICE_CREATING_ERROR,
        message: result
      })
    }
  }
}

import {
  SET_COUNTERS_IN_NEW
} from '../consts';

export function setCounters(counters) {
  return {
    type: SET_COUNTERS_IN_NEW,
    counters
  }
}
