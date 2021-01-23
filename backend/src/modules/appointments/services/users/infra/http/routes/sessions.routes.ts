import { Router } from 'express'

import SessionsController from '../controllers/SessionsController'

const sessionsRoutes = Router()
const controller = new SessionsController()

sessionsRoutes.post('/', controller.create)

export default sessionsRoutes