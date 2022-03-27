import prisma from "../../../../database/prismaClient"

interface IUpdateDeliveryman {
  id_delivery: string
  id_deliveryman: string
}

export default class UpdateDeliverymanUseCase {
  async execute({ id_delivery, id_deliveryman }: IUpdateDeliveryman) {
    const delivery = await prisma.delivery.updateMany({
      where: {
        id: id_delivery,
        id_deliveryman: null
      },
      data: {
        id_deliveryman
      }
    })

    if (delivery.count == 0) {
      throw new Error('Delivery not found')
    }

    return delivery
  }
}