import { FETCH_PRICES } from '../consts';

const initialData = {
  data: [],
  view: {
    error: false
  }
}

export default function prices(state = initialData, action) {
  switch (action.type) {
    case FETCH_PRICES: {
      return Object.assign({}, state, {
        data: action.data
      })
    }
    default: {
      return state;
    }
  }
}
