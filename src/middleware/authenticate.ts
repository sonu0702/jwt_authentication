import { Request, Response } from "express";
import { User } from "orm/entities/users/User";
import { getRepository } from "typeorm";
import { verifyAccessToken } from "utils/jwt_helper";
import { CustomError } from "utils/response/custom-error/CustomError";
import Logger from '../logger';


export async function authenticate(req: Request, res: Response, next: any) {
    try {
        const bearerToken = req.get('Authorization');
        if (!bearerToken) {
            throw new CustomError(401, 'General', 'Authorization error, no bearer token', null, null);
        }
        let splitToken = bearerToken.split(' ');
        if (splitToken.length < 2) {
            throw new CustomError(401, 'General', 'Authorization error, no bearer token', null, null);
        }
        let token = splitToken[1];
        let tokenPayload = verifyAccessToken(token) as { [x: string]: string }
        req.requestUser = {
            email: tokenPayload?.email,
            user_uuid: tokenPayload?.user_uuid
        }
        const user = getRepository(User).findOne({
            where: { user_uuid: req?.requestUser?.user_uuid }
        });
        if (!user) {
            throw new CustomError(401, 'General', 'Authorization error, user not found', null, null);
        }
        return next();
    } catch (error) {
        Logger.error("authenticate error", error, error.JSON ?? error.message, error);
        const customError = new CustomError(401, 'General', 'Authorization error', null, error);
        return next(customError);
    }
}
