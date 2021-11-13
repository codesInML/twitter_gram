import { StatusCodes } from 'http-status-codes'
import CustomError from './customError'

export default class NotFoundError extends CustomError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

