import { Router } from "express";
import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import UserAPI from "./user";

import Logger from '../../logger';

const router = Router();

router.use("/users", UserAPI);


export default router;
