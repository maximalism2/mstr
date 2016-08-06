import {
  FETCH_USERDATA
} from '../consts/profile';
import origin from '../origin';
import {
  read
} from '../fetch';

export const fetchUserdata = id => async dispatch => {
  console.log('fetching userdata');
  let url = `${origin}/api/user/`;

  if (id) {
    url += id + '/';
  }

  const response = await read(url);

  if (response.status !== 200) {
    console.log('error when load userdata');
  } else {
    const data = await response.json();
    dispatch({
      type: FETCH_USERDATA,
      data
    });
  }
}
