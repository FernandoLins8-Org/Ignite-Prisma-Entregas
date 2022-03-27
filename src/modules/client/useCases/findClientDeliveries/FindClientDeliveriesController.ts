import { Request, Response } from 'express'
import FindClientDeliveriesUseCase from './FindClientDeliveriesUseCase'

export default class FindClientDeliveriesController {
  async handle(req: Request, res: Response) {
    const { id_client } = req

    const findClientDeliveriesUseCase = new FindClientDeliveriesUseCase()
    const deliveries = await findClientDeliveriesUseCase.execute(id_client)

    return res.json(deliveries)
  }
}