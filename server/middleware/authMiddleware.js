import {
  ErrorUnauthenticated,
  ErrorUnauthorized,
  ErrorBadRequest,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokens.js";

export const authenticateUser = (req, res, next) => {
  const { authToken } = req.cookies;
  if (!authToken) throw new ErrorUnauthenticated("authentication invalid");
  try {
    const { userId, role } = verifyJWT(authToken);
    const testUser = userId === "65a5ca94810b8eff54e85e10";
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    console.log("here, in authMiddleware authenticateUser");
    throw new ErrorUnauthenticated("authentication invalid");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ErrorUnauthorized(
        `The role '${req.user.role}' is unauthorized to access this route.`
      );
    }

    next();
  };
};

export const forbidTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new ErrorBadRequest("Demo user, read only!");
  }
  next();
};
