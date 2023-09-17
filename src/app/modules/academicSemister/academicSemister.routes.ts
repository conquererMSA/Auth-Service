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
AcademicSemisterRoutes.get(
  '/id',
  AcademicSemisterController.getSingleAcademicSemisterController,
)

AcademicSemisterRoutes.patch(
  '/id',
  validateRequest(AcademicSemisterValidation.updateAcademicSemisterZodSchema),
  AcademicSemisterController.updateAcademicSemisterController,
)

AcademicSemisterRoutes.get(
  '/all',
  AcademicSemisterController.getAllAcademicSemisterController,
)

export default AcademicSemisterRoutes
