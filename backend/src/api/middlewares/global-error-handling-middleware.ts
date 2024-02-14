import { Response, Request, NextFunction } from "express";

const globalErrorHandlerMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  switch (error.name) {
    case "NotFoundError":
      return res.status(404).json({ message: error.message });
    case "ForbiddenError":
      return res.status(403).json({ message: error.message });
    case "UnauthorizedError":
      return res.status(401).json({ message: error.message });
    case "ValidationErrors":
      return res.status(400).json({ message: error.message });
    default:
      return res
        .status(500)
        .json({
          message:
            error.message || "Something went wrong, please try again later",
        });
  }
};

export default globalErrorHandlerMiddleware;
