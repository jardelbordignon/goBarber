import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'

import checkAuthentication from '../middlewares/checkAuthentication'
import ProfileController from '../controllers/ProfileController'

const profileRoutes = Router()
const profileController = new ProfileController()

profileRoutes.use(checkAuthentication)

profileRoutes.get('/', profileController.show)

profileRoutes.put(
  '/',
  celebrate({
    body: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid( Joi.ref('password') )
    }
  }),
  profileController.update
)

export default profileRoutes