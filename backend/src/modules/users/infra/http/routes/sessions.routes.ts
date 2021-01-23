import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'

import SessionsController from '../controllers/SessionsController'

const sessionsRoutes = Router()
const controller = new SessionsController()

sessionsRoutes.post(
  '/',
  celebrate({
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  controller.create
)

export default sessionsRoutes