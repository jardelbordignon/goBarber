import { Router } from 'express'

import checkAuthentication from '../middlewares/checkAuthentication'
import ProfileController from '../controllers/ProfileController'

const profileRoutes = Router()
const controller = new ProfileController()

profileRoutes.use(checkAuthentication)

profileRoutes.get('/', controller.show)
profileRoutes.put('/', controller.update)

export default profileRoutes