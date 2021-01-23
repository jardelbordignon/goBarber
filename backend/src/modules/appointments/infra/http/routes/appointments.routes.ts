import { Router } from 'express'

import checkAuthentication from '@modules/users/infra/http/middlewares/checkAuthentication'
import AppointmentsController from '../controllers/AppointmentsController'

const controller = new AppointmentsController()

const appointmentsRoutes = Router()

appointmentsRoutes.use(checkAuthentication)

appointmentsRoutes.get('/', () => {})

appointmentsRoutes.post('/', controller.create)


export default appointmentsRoutes