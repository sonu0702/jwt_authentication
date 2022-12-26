import express, { Request, Response } from "express";
import { validate } from "../util";
import { query } from "express-validator";
import asyncHandler from "express-async-handler";
import { authenticate } from "middleware/authenticate";
import { getProfile, registerNewUser, validateExistingUser } from 'controller/user';
const UserAPI = express.Router();

UserAPI.get(
    "/profile",
    authenticate,
    [

    ],
    asyncHandler(async (req: Request, res: Response, next: any) => {
        const response = await getProfile(req.requestUser.user_uuid);
        res.customSuccess(200, "user", response);
    })
);

UserAPI.post(
    "/register",
    [

    ],
    asyncHandler(async (req: Request, res: Response, next: any) => {
        const response = await registerNewUser(req.body.email, req.body.password);
        res.customSuccess(200, "new user", response);
    })
);

UserAPI.post(
    "/validate",
    [

    ],
    asyncHandler(async (req: Request, res: Response, next: any) => {
        const response = await validateExistingUser(req.body.email, req.body.password);
        res.customSuccess(200, "existing user", response);
    })
);

export default UserAPI;
