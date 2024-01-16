import { StatusCodes } from "http-status-codes";

// Appending the status code is used by the validation middleware to throw an error with the
// appropriate status code, since express-validator only looks at the message from thrown errors.

export class ErrorNotFound extends Error {
  constructor(message, appendStatusCode = false) {
    if (appendStatusCode === true) {
      message = `{{${StatusCodes.NOT_FOUND}}}${message}`;
    }
    super(message);
    this.name = "ErrorNotFound";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export class ErrorBadRequest extends Error {
  constructor(message, appendStatusCode = false) {
    if (appendStatusCode === true) {
      message = `{{${StatusCodes.BAD_REQUEST}}}${message}`;
    }
    super(message);
    this.name = "ErrorBadRequest";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export class ErrorUnauthenticated extends Error {
  constructor(message, appendStatusCode = false) {
    if (appendStatusCode === true) {
      message = `{{${StatusCodes.UNAUTHORIZED}}}${message}`;
    }
    super(message);
    this.name = "ErrorUnauthenticated";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export class ErrorUnauthorized extends Error {
  constructor(message, appendStatusCode = false) {
    if (appendStatusCode === true) {
      message = `{{${StatusCodes.FORBIDDEN}}}${message}`;
    }
    super(message);
    this.name = "ErrorUnauthorized";
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
