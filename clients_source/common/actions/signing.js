import { LOGOUT } from '../consts/signing';
import { read } from '../fetch';
import origin from '../origin';

export const logout = () => async dispatch => {
  console.log('need to signout');
  let url = `${origin}/api/logout/`;
  const response = await read(url);
  console.log(response);
  if (response.ok) {
    console.log(response.json());
  }
}