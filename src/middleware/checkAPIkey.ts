import { Request, Response } from "express";
import { CustomError } from "utils/response/custom-error/CustomError";
import Logger from '../logger';


export async function checkAPIKey(req: Request, res: Response, next: any) {
    try {
        const apikey = req.headers.api_key;
        if (apikey !== process.env.API_KEY) {
            Logger.error(`Invalid API key`);
            throw new CustomError(401, 'General', 'Authorization error', null, null);
        }
        return next();
    } catch (error) {
        Logger.error("check club admin", error, error.JSON ?? error.message, error);
        const customError = new CustomError(401, 'General', 'Authorization error', null, error);
        return next(customError);
    }
}
