import { Request, Response, NextFunction } from 'express';

import Logger from '../logger';

import { CustomError } from 'utils/response/custom-error/CustomError';

function removeStackTrace(err: CustomError) {
  const errorResponse = err.JSON;
  delete errorResponse.stack;
  delete errorResponse.errorRaw;
  return errorResponse;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  Logger.error({ error: err.JSON, context: res.locals.context });
  return res.status(err.HttpStatusCode).json({ ...removeStackTrace(err), requestId: req.headers.zRequestId });
};
