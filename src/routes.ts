import { Router } from 'express'

import CreateClientController from './modules/client/useCases/createClient/createClientController'
import AuthenticateClientController from './modules/account/autheticateClient/AuthenticateClientController'

const routes = Router()
const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()

routes.post('/client', createClientController.handle)
routes.post('/authenticate', authenticateClientController.handle)

export default routes
