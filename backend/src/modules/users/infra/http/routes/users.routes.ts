import { Router } from 'express'
import multer from 'multer'
import { celebrate, Joi } from 'celebrate'

import configMulter from '@config/multer'
import checkAuthentication from '../middlewares/checkAuthentication'
import UsersController from '../controllers/UsersController'

const usersRoutes = Router()
const controller = new UsersController()
const upload = multer(configMulter)

usersRoutes.get('/', controller.index)

usersRoutes.post(
  '/',
  celebrate({
    body: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  controller.create
)

usersRoutes.patch('/avatar', 
  checkAuthentication, 
  upload.single('avatar'),
  controller.updateAvatar
)

export default usersRoutes