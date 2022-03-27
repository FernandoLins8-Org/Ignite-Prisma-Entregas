import { Request, Response } from 'express'
import FindDeliverymanDeliveriesUseCase from './FindDeliverymanDeliveriesUseCase'

export default class FindDeliverymanDeliveriesController {
  async handle(req: Request, res: Response) {
    const { id_deliveryman } = req

    const findDeliverymanDeliveriesUseCase = new FindDeliverymanDeliveriesUseCase()

    const deliveries = await findDeliverymanDeliveriesUseCase.execute(id_deliveryman)

    return res.json(deliveries)
  }
} 