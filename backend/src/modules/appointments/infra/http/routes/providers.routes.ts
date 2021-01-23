import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'

import checkAuthentication from '@modules/users/infra/http/middlewares/checkAuthentication'
import ProvidersController from '../controllers/ProvidersController'
import ProviderMontAvailabilityController from '../controllers/ProviderMontAvailabilityController'
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController'

const providersController = new ProvidersController()
const providerMontAvailabilityController = new ProviderMontAvailabilityController()
const providerDayAvailabilityController = new ProviderDayAvailabilityController()

const providersRoutes = Router()

const provider_param_validation = celebrate({
  params: { provider_id: Joi.string().uuid().required() }
})

providersRoutes.use(checkAuthentication)

providersRoutes.get('/', providersController.index )
providersRoutes.get(
  '/:provider_id/month-availability',
  provider_param_validation,
  providerMontAvailabilityController.index
)
providersRoutes.get(
  '/:provider_id/day-availability',
  provider_param_validation,
  providerDayAvailabilityController.index
)


export default providersRoutes