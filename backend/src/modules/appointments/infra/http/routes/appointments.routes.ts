import { Router } from 'express'
import { celebrate, Joi} from 'celebrate'

import checkAuthentication from '@modules/users/infra/http/middlewares/checkAuthentication'
import AppointmentsController from '../controllers/AppointmentsController'
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController'

const appointmentsController = new AppointmentsController()
const providerAppointmentsController = new ProviderAppointmentsController()

const appointmentsRoutes = Router()

appointmentsRoutes.use(checkAuthentication)

appointmentsRoutes.post('/', 
  celebrate({
    body: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date()
    }
  }),
  appointmentsController.create)
appointmentsRoutes.get('/me', providerAppointmentsController.index)


export default appointmentsRoutes