import { Response, Request, NextFunction } from "express";
import ForbiddenError from "../../domain/errors/forbidden-errors";
const AuthorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //@ts-ignore
  if (req.auth.claims.metadata.role !== "admin") {
    throw new ForbiddenError("Access denied");
  }
  next();
};
export default AuthorizationMiddleware;