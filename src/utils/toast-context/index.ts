export type toastMessagePayload = {
  api?: 'USER' | 'WALLET' | string;
  show_toast?: boolean;
  has_action?: boolean;
  navigate_to?: string;
  toast_message?: string;
  toast_level?: 'ERROR' | 'INFO' | 'SUCCESS';
};
