import { Router } from 'express'

import CreateClientController from './modules/client/useCases/createClient/createClientController'
import AuthenticateClientController from './modules/account/autheticateClient/AuthenticateClientController'
import CreateDeliverymanController from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController'
import AuthenticateDeliverymanController from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController'
import CreateDeliveryController from './modules/delivery/useCases/createDelivery/CreateDeliveryController'
import ensureAuthenticatedClient from './middlewares/ensureAuthenticatedClient'
import ensureAuthenticatedDeliveryman from './middlewares/ensureAuthenticatedDeliveryman'
import FindAvailableDeliveriesController from './modules/delivery/useCases/findAvailableDeliveries/FindAvailableDeliveriesController'
import UpdateDeliverymanController from './modules/delivery/useCases/UpdateDeliveryman/UpdateDeliverymanController'

const routes = Router()
const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const createDeliveryController = new CreateDeliveryController()
const findAvailableDeliveriesController = new FindAvailableDeliveriesController()
const updateDeliverymanController = new UpdateDeliverymanController()

routes.post('/client', createClientController.handle)
routes.post('/client/authenticate', authenticateClientController.handle)

routes.post('/deliveryman', createDeliverymanController.handle)
routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle)

routes.post('/delivery', ensureAuthenticatedClient, createDeliveryController.handle)
routes.get('/delivery/available', ensureAuthenticatedDeliveryman, findAvailableDeliveriesController.handle)
routes.put('/delivery/updateDeliveryman/:id', ensureAuthenticatedDeliveryman, updateDeliverymanController.handle)

export default routes
