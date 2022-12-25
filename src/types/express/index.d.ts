import { toastMessagePayload } from 'utils/toast-context';

declare global {
  namespace Express {
    export interface Response {
      customSuccess(
        httpStatusCode: number,
        message: string,
        data?: any,
        toastContext?: toastMessagePayload,
        requestId?: string,
      ): Response;
    }
  }
}
