import { NextFunction, Request, Response } from 'express'
import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

const createUserController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body
    const result = await UserService.createUserService(user)
    sendResponse(res, {
      success: true,
      message: 'Successfully created user',
      statusCode: httpStatus.OK,
      data: result,
    })
    next()
  },
)

export const UserController = { createUserController }
