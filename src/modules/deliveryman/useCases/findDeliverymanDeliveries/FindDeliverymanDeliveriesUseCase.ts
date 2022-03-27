import prisma from "../../../../database/prismaClient";

export default class FindDeliverymanDeliveriesUseCase {
  async execute(id_deliveryman: string) {
    const deliveries = await prisma.delivery.findMany({
      where: {
        id_deliveryman
      }
    })

    return deliveries
  }
}