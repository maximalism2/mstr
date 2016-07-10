import {
  TOGGLE_DROPDOWN_MENU
} from '../consts/common';

const initialCommonView = {
  dropdownMenuOpened: false
}

export default function commonView(state = initialCommonView, action) {
  switch (action.type) {
    case TOGGLE_DROPDOWN_MENU: {
      return Object.assign({}, state, {
        dropdownMenuOpened: !state.dropdownMenuOpened
      });
    }
    default: {
      return state;
    }
  }
}