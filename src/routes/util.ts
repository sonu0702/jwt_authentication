import { validationResult } from "express-validator";
import { CustomError } from "utils/response/custom-error/CustomError";

export function validate(req: Request, res: Response, next: any) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError(400, "Validation", errors.array({ onlyFirstError: true })[0].msg)
  }
  next();
}
