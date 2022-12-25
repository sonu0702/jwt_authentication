import { response, Response } from 'express';

import { toastMessagePayload } from 'utils/toast-context';
response.customSuccess = function (
  httpStatusCode: number,
  message: string,
  data: any = null,
  toastContext: toastMessagePayload = {},
): Response {
  return this.status(httpStatusCode).json({ message, data, toastContext, requestId: this.req.headers.zRequestId });
};
