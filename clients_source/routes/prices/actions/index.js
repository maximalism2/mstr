import {
  FETCH_PRICES, FETCH_PRICE_BY_ID, ERROR_FPM, FETCHING_LOADING
} from '../consts';
import { read } from '../../../common/fetch';
import origin from '../../../common/origin';

function loading(flag, dispatch) {
  dispatch({
    type: FETCHING_LOADING,
    flag
  });
}

export function fetchPrices(needToShowLoader = false) {
  return async dispatch => {
    if (needToShowLoader) {
      loading(true, dispatch);
    }

    let url = origin + '/api/price/';
    const response = await read(url);
    if (response.ok) {
      let responseBody = await response.json();
      const data = JSON.parse(responseBody);
      if (needToShowLoader) {
        loading(false, dispatch);
      }
      dispatch({
        type: FETCH_PRICES,
        data
      });
    } else {
      if (needToShowLoader) {
        loading(false, dispatch);
      }
      dispatch({
        type: ERROR_FPM
      });
    }
  }
}

export function fetchPriceById(id) {
  return async dispatch => {
    let url = `${origin}/api/price/${id}/`;
    const response = await read(url);
    if (response.ok) {
      console.log('data by id', JSON.parse(await response.json()));
    }
  }
}
