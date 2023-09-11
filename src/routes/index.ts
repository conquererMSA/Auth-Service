import { Router } from 'express'
import UserRoutes from '../app/modules/user/user.routes'
import AcademicSemisterRoutes from '../app/modules/academicSemister/academicSemister.routes'

const RootRoute = Router()

const routeModules = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semister',
    route: AcademicSemisterRoutes,
  },
]

routeModules.forEach(({ path, route }) => RootRoute.use(path, route))

export default RootRoute
