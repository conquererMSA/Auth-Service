import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { AcademicSemisterValidation } from './academicSemister.validation'
import { AcademicSemisterController } from './academicSemister.controller'
const AcademicSemisterRoutes = express.Router()

//academic semister routes
AcademicSemisterRoutes.post(
  '/create-semister',
  validateRequest(AcademicSemisterValidation.createAcademicSemisterZodSchema),
  AcademicSemisterController.createAcademicSemisterController,
)

export default AcademicSemisterRoutes
