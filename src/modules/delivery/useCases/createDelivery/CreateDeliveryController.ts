import { Request, Response } from 'express'
import CreateDeliveryUseCase from './CreateDeliveryUseCase'

export default class CreateDeliveryController {
  async handle(req: Request, res: Response) {
    const { id_client } = req
    const { item_name } = req.body

    const createDeliveryUseCase = new CreateDeliveryUseCase()

    const delivery = await createDeliveryUseCase.execute({
      id_client,
      item_name
    })

    return res.json(delivery)
  }
}