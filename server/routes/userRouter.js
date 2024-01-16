import { Router } from "express";
const router = Router();

import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import { validateUserUpdateInput } from "../middleware/validationMiddleware.js";
import {
  authorizePermissions,
  forbidTestUser,
} from "../middleware/authMiddleware.js";
import { USER_ROLE } from "../utils/constants.js";
import upload from "../middleware/multerMiddleware.js";

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", [
  authorizePermissions(USER_ROLE.ADMIN),
  getApplicationStats,
]);
router.patch(
  "/update-user",
  forbidTestUser,
  upload.single("avatar"),
  validateUserUpdateInput,
  updateUser
);

export default router;
