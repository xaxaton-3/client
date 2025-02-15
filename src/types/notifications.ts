export interface Notification {
  id: number;
  to_user: number;
  message: string;
  status: NotificationStatus;
  received: boolean;
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
