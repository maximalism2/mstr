import {
  FETCH_PRICES, FETCH_PRICE_BY_ID, ERROR_FPM
} from '../consts';
import { read } from '../../../common/fetch';
import origin from '../../../common/origin';

export function fetchPrices() {
  return async dispatch => {
    let url = origin + '/price/';
    const response = await read(url);
    if (response.ok) {
      let responseBody = await response.json();
      const data = JSON.parse(responseBody);

      dispatch({
        type: FETCH_PRICES,
        data
      })
    } else {
      dispatch({
        type: ERROR_FPM
      });
    }
  }
}

export function fetchPriceById(id) {
  return async dispatch => {
    let url = `${origin}/price/${id}/`;
    const response = await read(url);
    if (response.ok) {
      console.log('data by id', JSON.parse(await response.json()));
    }
  }
}
