import { Response, Request } from 'express';

import { Context } from '../types';

export function createContext(req: Request, res: Response, next: any) {
  const context: Context = {
    requestId: req.headers.zRequestId as string,
  };
  res.locals.context = context;
  next();
}
