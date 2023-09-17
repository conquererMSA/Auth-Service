import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../Helpers/paginationHelper'
import ApiError from '../../../errors/ApiError'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { academicSemisterTitleCodeMapper } from './academicSemister.constant'
import {
  IAcademicSemister,
  IAcademicSemisterFilters,
} from './academicSemister.interface'
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

const getAllAcademicSemisterService = async (
  filters: IAcademicSemisterFilters,
  paginationData: IPaginationOptions,
): Promise<IGenericResponse<IAcademicSemister[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationData)
  const { searchTerm, ...filtersData } = filters

  //dynamic searching by loop
  const academicSemisterSearchableFields = ['title', 'code', 'year']
  // const andCondition = [searchFields implicitAnd filtersField]
  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $or: academicSemisterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $option: 'i',
        },
      })),
    })
  }
  // const andCondition = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $option: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $option: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $option: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ]

  //dynamic filtering for exact match
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  // if (Object.keys(filtersData).length) {
  //   $and: [
  //     {
  //       title: filtersData.title,
  //     },
  //     {
  //       code: filtersData.code,
  //     },
  //   ]
  // }

  //SortOrder from mongoose
  const sortCondition: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }
  //dynamic and condition
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {}
  const result = await AcademicSemister.find(
    // { $and: andCondition }
    whereCondition,
  )
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await AcademicSemister.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleAcademicSemisterService = async (
  id: string,
): Promise<IAcademicSemister | null> => {
  const result = await AcademicSemister.findById({ id })
  return result
}

const updateAcademicSemisterService = async (
  id: string,
  payload: Partial<IAcademicSemister>,
): Promise<IAcademicSemister | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemisterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semister code')
  }
  const result = await AcademicSemister.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const AcademicSemisterService = {
  createAcademicSemisterService,
  getAllAcademicSemisterService,
  getSingleAcademicSemisterService,
  updateAcademicSemisterService,
}
