import { NextFunction, Request, Response } from 'express'
import { AcademicSemisterService } from './academicSemister.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

const createAcademicSemisterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { semisterData } = req.body

    const result =
      await AcademicSemisterService.createAcademicSemisterService(semisterData)
    //emnitei next function use kora hocce
    next()
    sendResponse(res, {
      success: true,
      message: 'Successfully created academic semister',
      statusCode: httpStatus.OK,
      data: result,
    })
  },
)

export const AcademicSemisterController = { createAcademicSemisterController }
