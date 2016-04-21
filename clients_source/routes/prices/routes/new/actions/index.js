import {
  CHANGE_FIELD, ADD_ROW, REMOVE_ROW, NEW_PRICE_LOADING, MAKE_INPUT
} from '../consts';

import origin from '../../../../../common/origin';
import { create } from '../../../../../common/fetch';

export function changeField(field) {
  return {
    type: CHANGE_FIELD,
    field
  }
}

export function addRow(row) {
  return {
    type: ADD_ROW,
    row
  }
}

export function removeRow(index) {
  return {
    type: REMOVE_ROW,
    index
  }
}

export function loading(flag) {
  return {
    type: NEW_PRICE_LOADING,
    flag
  }
}

export function makeInput(index) {
  return {
    type: MAKE_INPUT,
    index
  }
}

export function createPrice(priceTemplate) {
  return async dispatch => {
    let url = origin + '/price/';
    const response = await create(url, priceTemplate);

    console.log('response', response);
    if (response.ok) {
      const result = await response.json();
      if (typeof result === 'string') {
        let textResult = JSON.parse(result);
        console.log('result', textResult);
      }
    }
  }
}
