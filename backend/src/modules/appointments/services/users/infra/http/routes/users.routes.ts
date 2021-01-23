import { Router } from 'express'
import multer from 'multer'

import configMulter from '@config/multer'
import checkAuthentication from '../middlewares/checkAuthentication'
import UsersController from '../controllers/UsersController'

const usersRoutes = Router()
const controller = new UsersController()
const upload = multer(configMulter)

usersRoutes.get('/', controller.index)

usersRoutes.post('/', controller.create)

usersRoutes.patch('/avatar', 
  checkAuthentication, 
  upload.single('avatar'),
  controller.updateAvatar
)

export default usersRoutes