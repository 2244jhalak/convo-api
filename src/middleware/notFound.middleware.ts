import { NextFunction, Request, Response } from "express"

export interface CustomError extends Error {
    status? : number
}


export const notFound= (req: Request, res: Response, next: NextFunction) => {
    const error: CustomError= new Error("Route Not Found");
    error.status= 404;
    next(error)


}