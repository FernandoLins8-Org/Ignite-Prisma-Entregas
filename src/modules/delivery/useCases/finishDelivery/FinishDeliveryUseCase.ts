import prisma from "../../../../database/prismaClient";

interface IFinishDelivery {
  id_delivery: string
  id_deliveryman: string
}

export default class FinishDeliveryUseCase {
  async execute({ id_delivery, id_deliveryman }: IFinishDelivery) {
    const delivery = await prisma.delivery.updateMany({
      where: {
        id: id_delivery,
        id_deliveryman,
        end_date: null
      },
      data: {
        end_date: new Date()
      }
    })

    if (delivery.count == 0) {
      throw new Error('Delivery not found')
    }

    return delivery
  }
}