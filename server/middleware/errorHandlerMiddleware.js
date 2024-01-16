import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (error, req, res, next) => {
  // console.log(error);

  // DEFAULT
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message || "Something went wrong, try again later";

  // MISSING FIELD
  if (error.name === "ValidationError") {
    statusCode = StatusCodes.BAD_REQUEST;
    message = Object.values(error.errors)
      .map((item) => item.message)
      .join(", ");
  }

  // UNIQUE FIELD DUPLICATE VALUE
  if (error.code && error.code === 11000) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = `${Object.keys(error.keyValue)} must be unique. ${
      error.keyValue.email
    } already exists.`;
  }

  // SEND RESPONSE
  res.status(statusCode).json({ message });
};

export default errorHandlerMiddleware;
