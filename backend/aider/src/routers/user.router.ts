import { Router } from "express";
import * as userController from '../controllers/user.controller'
import { authenticate } from "../middlewares/auth.middleware";
const router = Router()

router.get('/', userController.getUsers)
router.get('/:userId', userController.getUser)
router.put('/:userId', authenticate, userController.updateUser)
router.patch('/:userId', authenticate, userController.toggleStatus)

export default router