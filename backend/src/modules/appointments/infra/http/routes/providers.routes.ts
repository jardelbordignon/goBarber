import { Router } from 'express'

import checkAuthentication from '@modules/users/infra/http/middlewares/checkAuthentication'
import ProvidersController from '../controllers/ProvidersController'
import ProviderMontAvailabilityController from '../controllers/ProviderMontAvailabilityController'
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController'

const providersController = new ProvidersController()
const providerMontAvailabilityController = new ProviderMontAvailabilityController()
const providerDayAvailabilityController = new ProviderDayAvailabilityController()

const providersRoutes = Router()

providersRoutes.use(checkAuthentication)

providersRoutes.get('/', providersController.index)
providersRoutes.get('/:provider_id/month-availability', providerMontAvailabilityController.index)
providersRoutes.get('/:provider_id/day-availability', providerDayAvailabilityController.index)


export default providersRoutes