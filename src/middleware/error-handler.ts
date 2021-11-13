import { ErrorRequestHandler} from 'express'
import { StatusCodes } from 'http-status-codes'
import log from '../utils/logger'

export const errorHandlerMiddleware:ErrorRequestHandler = (err, req, res, next) => {
  // log.error(err)
  let customError: {
    statusCode: number;
    message: string;
  } = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, please try again later"
  }

  if (err.name == "ZodError"){
    customError.message = Object.values(err.issues).map((item: any) => item.message).join(", ")
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  if (err.name == "SequelizeUniqueConstraintError"){
    customError.message = Object.values(err.errors).map((item: any) => item.message).join(", ")
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  if (err.name == "SequelizeValidationError") {
    customError.message = Object.values(err.errors).map((item: any) => item.message).join(", ")
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
  
  log.error(customError.message)
  return res.status(customError.statusCode).json({ status: "failed", err: customError.message })
}

