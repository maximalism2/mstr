import {
  FETCH_PRICE_BY_ID, FETCHING_LOADING, FBI_ERROR
} from '../consts';

import origin from '../../../common/origin';
import { read, destroy } from '../../../common/fetch';

export function fetchPriceById(id) {
  return async dispatch => {
    dispatch({
      type: FETCHING_LOADING,
      flag: true
    });

    let url = `${origin}/api/price/${id}/`;
    const response = await read(url);

    if (response.ok) {
      dispatch({
        type: FETCH_PRICE_BY_ID,
        data: JSON.parse(await response.json())
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

export function editModeOn() {
  return {
    type: EDIT_MODE_ON
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
    console.log(url);

    setTimeout(() => {
      dispatch({
        type: REMOVING_LOADING,
        flag: false
      });
      dispatch({
        type: REMOVING_SUCCESS
      });
    }, 2000)
    // let response = await destroy(url);
    // console.log('response', response);
    // console.log('result', await response.json());
  }
}

import { RESET_PRICE_VIEW } from '../consts';

export function resetPriceView() {
  return {
    type: RESET_PRICE_VIEW
  }
}