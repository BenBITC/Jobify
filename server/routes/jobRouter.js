import { Router } from "express";
const router = Router();

// API Calls
import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobController.js";

// Middleware before API calls can run
import {
  validateJobIdParam,
  validateJobInput,
} from "../middleware/validationMiddleware.js";
import { forbidTestUser } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getAllJobs)
  .post(forbidTestUser, validateJobInput, createJob);
router.route("/stats").get(showStats);
router
  .route("/:id")
  .get(validateJobIdParam, getJob)
  .patch(forbidTestUser, validateJobIdParam, validateJobInput, updateJob)
  .delete(forbidTestUser, validateJobIdParam, deleteJob);

export default router;
