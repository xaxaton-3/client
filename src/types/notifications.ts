export interface Notification {
  to_user: number;
  message: string;
  status: NotificationStatus;
}

export enum NotificationStatus {
  Success = 1,
  Info,
  Warning,
  Error,
}

export interface CreateNotificationParams {
  to_user: number;
  message: string;
  status: NotificationStatus;
}
