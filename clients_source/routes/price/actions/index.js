import {
  FETCH_PRICE_BY_ID, FETCHING_LOADING, FBI_ERROR
} from '../consts';
import origin from '../../../common/origin';
import { read } from '../../../common/fetch';

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
