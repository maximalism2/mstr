import { SHOW_NOTIFICATION, DELETE_NOTIFICATION } from './consts';

let initialNotificationStore = [];

export default function notification(state = initialNotificationStore, action) {
  switch (action.type) {
    case SHOW_NOTIFICATION: {
      return [...state, {
        type: action.notificationType,
        message: action.notificationMessage,
        id: action.notificationId
      }];
    }
    case DELETE_NOTIFICATION: {
      return state.filter(notification => notification.id !== action.id);
    }
    default: {
      return state;
    }
  }
}