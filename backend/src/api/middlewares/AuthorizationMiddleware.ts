import { Response, Request, NextFunction } from "express";
import ForbiddenError from "../../domain/errors/forbidden-errors";
const AuthorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRole = req.query.role || "NO_USER_ROLE";

  // // @ts-ignore
  if (userRole !== "admin") {
    throw new ForbiddenError("Access denied");
  }
  next();
};
export default AuthorizationMiddleware;
