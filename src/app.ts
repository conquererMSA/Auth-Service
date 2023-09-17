import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './middlewares/globalErrorHandlers'
import RootRoute from './routes'
import routeNotFound from './errors/notRouteFound'
// import ApiError from './errors/ApiError'

const app: Application = express()
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// console.log(app.get('env'))
// console.log(process.env)

// Application Root Routes
app.use('/api/v1/', RootRoute)

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.get('/api/v1', async (req: Request, res: Response, next: NextFunction) => {
  // res.json({ status: 200, message: 'App on home route' })
  // throw new ApiError(400, 'New error message from ApiError on app.ts from home route')
  // next('next error message')
  throw new Error('new Error from home route')

  // unhadled promise rejection
  // Promise.reject(new Error('Unhadled promise rejection!'))
})

// global error handler
app.use(globalErrorHandler)

//handle no route found middleware
app.use(routeNotFound)
export default app
