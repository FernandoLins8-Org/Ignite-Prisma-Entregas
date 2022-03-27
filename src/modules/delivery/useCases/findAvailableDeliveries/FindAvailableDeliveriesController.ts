import { Request, Response } from 'express'
import FindAvailableDeliveriesUseCase from './FindAvailableDeliveriesUseCase'

export default class FindAvailableDeliveriesController {
  async handle(req: Request, res: Response) {
    const findAvailableDeliveriesUseCase = new FindAvailableDeliveriesUseCase()

    const deliveries = await findAvailableDeliveriesUseCase.execute()

    return res.json(deliveries)
  }
}