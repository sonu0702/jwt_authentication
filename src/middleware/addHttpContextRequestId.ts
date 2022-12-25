import { Response, Request } from 'express';
import httpContext from 'express-http-context'

export function assignHttpContextRequestId(req: Request, res: Response, next: any) {
  httpContext.set('zRequestId', req.headers.zRequestId);
  next();
}
