import {
  IS_VALUE_UNIQUE, UNIQUENESS_ERROR, CHECKING_LOADING_IN_CUSTOMER_FIELD,
  CHANGE_FILED_AS_CUSTOMER,
  VALIDATION_ERROR,
  VALIDATION_SUCCESS
} from '../consts'
import { create } from '../../../../../common/fetch';
import origin from '../../../../../common/origin';

export const isValueUnique = (field, value) => async dispatch => {
  let url = origin + '/api/check/';
  const body = {
    field,
    value
  }

  const response = await create(url, body);

  if (response.ok) {
    const result = await response.json();
    dispatch({
      type: IS_VALUE_UNIQUE,
      result
    });
  } else {
    console.error(await response.json());
  }
}

export const changeField = (field, value) => ({
  type: CHANGE_FILED_AS_CUSTOMER,
  field,
  value
});

export const validationSuccess = fieldId => ({
  type: VALIDATION_SUCCESS,
  fieldId
});

export const validationError = fieldId => ({
  type: VALIDATION_ERROR,
  fieldId
});
