import { Router } from 'express'

import CreateClientController from './modules/client/useCases/createClient/createClientController'
import AuthenticateClientController from './modules/account/autheticateClient/AuthenticateClientController'
import CreateDeliverymanController from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController'
import AuthenticateDeliverymanController from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController'
import CreateDeliveryController from './modules/delivery/useCases/createDelivery/CreateDeliveryController'
import ensureAuthenticatedClient from './middlewares/ensureAuthenticatedClient'
import ensureAuthenticatedDeliveryman from './middlewares/ensureAuthenticatedDeliveryman'
import FindAvailableDeliveriesController from './modules/delivery/useCases/findAvailableDeliveries/FindAvailableDeliveriesController'
import UpdateDeliverymanController from './modules/delivery/useCases/updateDeliveryman/UpdateDeliverymanController'
import FindClientDeliveriesController from './modules/client/useCases/findClientDeliveries/FindClientDeliveriesController'
import FindDeliverymanDeliveriesController from './modules/deliveryman/useCases/findDeliverymanDeliveries/FindDeliverymanDeliveriesController'
import FinishDeliveryController from './modules/delivery/useCases/finishDelivery/FinishDeliveryController'

const routes = Router()
const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const createDeliveryController = new CreateDeliveryController()
const findAvailableDeliveriesController = new FindAvailableDeliveriesController()
const updateDeliverymanController = new UpdateDeliverymanController()
const findClientDeliveries = new FindClientDeliveriesController()
const findDeliverymanDeliveries = new FindDeliverymanDeliveriesController()
const finishDeliveryController = new FinishDeliveryController()

routes.post('/client', createClientController.handle)
routes.post('/client/authenticate', authenticateClientController.handle)
routes.get('/client/deliveries', ensureAuthenticatedClient, findClientDeliveries.handle)

routes.post('/deliveryman', createDeliverymanController.handle)
routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle)
routes.get('/deliveryman/deliveries', ensureAuthenticatedDeliveryman, findDeliverymanDeliveries.handle)

routes.post('/delivery', ensureAuthenticatedClient, createDeliveryController.handle)
routes.get('/delivery/available', ensureAuthenticatedDeliveryman, findAvailableDeliveriesController.handle)
routes.put('/delivery/updateDeliveryman/:id', ensureAuthenticatedDeliveryman, updateDeliverymanController.handle)
routes.put('/delivery/finish/:id', ensureAuthenticatedDeliveryman, finishDeliveryController.handle)

export default routes
