import express, { Request, Response } from "express";
import { validate } from "../util";
import { query } from "express-validator";
import asyncHandler from "express-async-handler";

import { checkAPIKey } from "middleware/checkAPIkey";

const UserAPI = express.Router();

UserAPI.post(
    "/",
    checkAPIKey,
    [

    ],
    asyncHandler(async (req: Request, res: Response, next: any) => {
        const response = {};
        res.customSuccess(200, "user", response);
    })
);


export default UserAPI;
