import express from 'express';
import { allUsersController, loginController, logoutController, registerController } from '../controllers/registerController.js';
import { isAdmin, isAuthorized } from '../middlewares/authMiddleware.js';

const router = express.Router();

http://localhost:8080/api/v1/users/register
router.post("/register",registerController)
router.post("/login", loginController)
router.get("/logout", logoutController)

// Admin Routes

router.get("/all-users",isAuthorized,isAdmin, allUsersController)
export default router;