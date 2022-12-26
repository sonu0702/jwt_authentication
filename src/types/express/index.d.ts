


  declare namespace Express {
    export interface Request {
      requestUser: { email: string, user_uuid: string };
    }
    export interface Response {
      customSuccess(
        httpStatusCode: number,
        message: string,
        data?: any,
        requestId?: string,
      ): Response;
    }
  }

