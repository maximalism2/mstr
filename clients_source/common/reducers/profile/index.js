import {
  FETCH_USERDATA
} from '../../consts/profile';

const initialProfileStore = {
  data: {
    userId: "",
    firstName: "",
    secondName: "",
    email: "",
    biography: "",
    phoneNumber: "",
    avatar: {
      s400: null,
      s200: null,
      s50: null
    }
  },
  view: {
    error: false
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_USERDATA: {
      return Object.assign({}, state, action.data);
    }
    default: {
      return state;
    }
  }
}