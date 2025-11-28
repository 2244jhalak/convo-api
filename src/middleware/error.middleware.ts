import { Request, Response, NextFunction } from 'express';

export interface CustomError extends Error {
    status? : number
}

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let status = 500;
  let message = 'Internal Server Error';

  if (err instanceof Error) {
    message = err.message;
    status = (err as CustomError).status ?? 500;
  }

  res.status(status).json({
    success: false,
    message,
  });
};