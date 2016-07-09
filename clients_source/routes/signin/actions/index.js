import {
  CHANGE_LOGIN_FORM_FIELD,
  LOGINING_LOADING,
  LOGINING_ERROR,
  LOGIN,
  TO_REGISTER,
  INPUT_VALIDATION_ERROR,
  RESET_VALIDATION_ERRORS
} from '../consts';
import origin from '../../../common/origin';
import { create } from '../../../common/fetch';

export const changeLoginFormField = field => ({
  type: CHANGE_LOGIN_FORM_FIELD,
  field
});

export const loginingLoading = flag => ({
  type: LOGINING_LOADING,
  flag
});

export const loginingError = error => ({
  type: LOGINING_ERROR,
  error
});

export const login = data => async dispatch => {
  dispatch(loginingLoading(true));

  let url = `${origin}/api/login/`;
  console.log('data', data);
  const response = await create(url, data);

  if (response.ok) {
    dispatch(loginingLoading(false));
    dispatch({
      type: LOGIN
    });
    location.href = location.origin;
  } else {
    dispatch(loginingLoading(false));
    dispatch(loginingError(await response.json()));
  }
}

// export const register = data => async dispatch => {
//   dispatch)
// }

export const toRegister = () => ({
  type: TO_REGISTER
});

export const validationError = (field, message) => ({
  type: INPUT_VALIDATION_ERROR,
  field,
  message
});

export const resetValidationErrors = () => ({
  type: RESET_VALIDATION_ERRORS
});
