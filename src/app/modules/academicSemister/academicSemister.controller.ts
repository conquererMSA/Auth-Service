import { NextFunction, Request, Response } from 'express'
import { AcademicSemisterService } from './academicSemister.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import {
  paginationFields,
  searchAndFilterFields,
} from '../../../constant/pagination'
import { IAcademicSemister } from './academicSemister.interface'

const createAcademicSemisterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const { semisterData } = req.body

    // const result =
    //   await AcademicSemisterService.createAcademicSemisterService(semisterData)
    // sendResponse(res, {
    //   success: true,
    //   message: 'Successfully created academic semister',
    //   statusCode: httpStatus.OK,
    //   data: result,
    // })
    next()
  },
)

const getAllAcademicSemisterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields)
    const filters = pick(req.query, searchAndFilterFields)
    const result = await AcademicSemisterService.getAllAcademicSemisterService(
      filters,
      paginationOptions,
    )
    sendResponse<IAcademicSemister[]>(res, {
      success: true,
      message: 'Semisters retrieved successfully',
      statusCode: httpStatus.OK,
      meta: result.meta,
      data: result.data,
    })
    next()
  },
)

const getSingleAcademicSemisterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const result =
      await AcademicSemisterService.getSingleAcademicSemisterService(id)
    sendResponse<IAcademicSemister>(res, {
      success: true,
      message: 'Semister retrieved successfully',
      statusCode: httpStatus.OK,
      data: result,
    })
    next()
  },
)

const updateAcademicSemisterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { updateData } = req.body
    const result = await AcademicSemisterService.updateAcademicSemisterService(
      id,
      updateData,
    )
    sendResponse<IAcademicSemister>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Successfully updated',
      data: result,
    })
    next()
  },
)
export const AcademicSemisterController = {
  createAcademicSemisterController,
  getAllAcademicSemisterController,
  getSingleAcademicSemisterController,
  updateAcademicSemisterController,
}
