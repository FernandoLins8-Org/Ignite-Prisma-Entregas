import { Request, Response } from 'express'
import UpdateDeliverymanUseCase from './UpdateDeliverymanUseCase'

export default class UpdateDeliverymanController {
  async handle(req: Request, res: Response) {
    const { id_deliveryman } = req
    const id_delivery = req.params.id

    const updateDeliverymanUseCase = new UpdateDeliverymanUseCase()
    const delivery = await updateDeliverymanUseCase.execute({
      id_delivery,
      id_deliveryman
    })

    return res.json(delivery)
  }
}