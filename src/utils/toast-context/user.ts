export const toast_messages_user: {
  LOGIN_SUCCESS: string;
  LOGIN_UNSUCCESS: string;
  SET_PIN_SUCCESS: string;
  WRONG_PIN: string;
} = {
  LOGIN_SUCCESS: `You are successfully logged into application.`,
  LOGIN_UNSUCCESS: 'You are not logged in yet.',
  SET_PIN_SUCCESS: 'You have set a new pin.',
  WRONG_PIN: 'Wrong pin.',
};

export const toast_messages_auth: {
  INVALID_OTP: string;
  ERROR_SENDING_OTP: string;
} = {
  INVALID_OTP: 'Please enter valid OTP',
  ERROR_SENDING_OTP: 'Something went wrong. Please try again later',
};

export const toast_messages_order: {
  ORDER_LIMIT_EXCEEDED: string;
} = {
  ORDER_LIMIT_EXCEEDED: 'You can purchase this nft once only.',
};
