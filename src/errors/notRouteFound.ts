import { Response, Request, NextFunction } from 'express'
import httpStatus from 'http-status'
const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMesaages: [
      {
        path: req.originalUrl,
        message: 'this api not found',
      },
    ],
  })
  next()
}
export default routeNotFound
