import express from 'express'
import { UserController } from './user.controller'
import { UserValidation } from './user.Validation'
import validateRequest from '../../../middlewares/validateRequest'

const UserRoutes = express.Router()

UserRoutes.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUserController,
)

export default UserRoutes
