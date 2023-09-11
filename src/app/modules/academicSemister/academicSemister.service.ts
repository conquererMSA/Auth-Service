import ApiError from '../../../errors/ApiError'
import { academicSemisterTitleCodeMapper } from './academicSemister.constant'
import { IAcademicSemister } from './academicSemister.interface'
import AcademicSemister from './academicSemister.model'
import httpStatus from 'http-status'

const createAcademicSemisterService = async (
  semisterData: IAcademicSemister,
): Promise<IAcademicSemister | null> => {
  if (
    academicSemisterTitleCodeMapper[semisterData.title] !== semisterData.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semister code!')
  }
  const createdSemister = await AcademicSemister.create(semisterData)
  return createdSemister
}

export const AcademicSemisterService = { createAcademicSemisterService }
