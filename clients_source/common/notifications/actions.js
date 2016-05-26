import { SHOW_NOTIFICATION, DELETE_NOTIFICATION } from './consts';

export function showNotification(notificationType = null, notificationMessage) {
  let notificationId = Math.round(Math.random() * 1000000);
  return {
    type: SHOW_NOTIFICATION,
    notificationId,
    notificationType,
    notificationMessage
  }
}

export function deleteNotification(id) {
  return {
    type: DELETE_NOTIFICATION,
    id
  }
}