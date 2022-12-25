import { Response, Request } from 'express';
import { v4 } from 'uuid';

export function assignRequestId(req: Request, res: Response, next: any) {
  req.headers.zRequestId = v4();
  next();
}
