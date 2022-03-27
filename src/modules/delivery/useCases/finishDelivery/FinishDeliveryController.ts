import { Request, Response } from 'express'
import FinishDeliveryUseCase from './FinishDeliveryUseCase'

export default class FinishDeliveryController {
  async handle(req: Request, res: Response) {
    const id_delivery = req.params.id
    const { id_deliveryman } = req

    const finishDeliveryUseCase = new FinishDeliveryUseCase()
    const delivery = await finishDeliveryUseCase.execute({
      id_delivery,
      id_deliveryman
    })

    return res.json(delivery)
  }
}