import {
  LOCATION_WILL_CHANGE,
  CHOOSE_SIDE,
  RESET_CHOOSE
} from '../consts';

export const locationWillChange = shortLocation => ({
  type: LOCATION_WILL_CHANGE,
  location: shortLocation
});

export const chooseSide = side => ({
  type: CHOOSE_SIDE,
  side
});

export const resetChoose = () => ({
  type: RESET_CHOOSE
});