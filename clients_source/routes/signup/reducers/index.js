import {
  LOCATION_WILL_CHANGE,
  CHOOSE_SIDE,
  RESET_CHOOSE
} from '../consts';

const initalRegistrationPage = {
  location: {},
  side: ''
}

export default function registrationPage(state = initalRegistrationPage, action) {
  switch (action.type) {
    case LOCATION_WILL_CHANGE: {
      return Object.assign({}, state, {
        location: action.location
      });
    }
    case CHOOSE_SIDE: {
      return Object.assign({}, state, {
        side: action.side
      });
    }
    case RESET_CHOOSE: {
      return Object.assign({}, state, {
        side: ''
      });
    }
    default: {
      return state;
    }
  }
}
