import prisma from "../../../../database/prismaClient";

export default class FindAvailableDeliveriesUseCase {
  async execute() {
    const deliveries = await prisma.delivery.findMany({
      where: {
        end_date: null,
        id_deliveryman: null
      }
    })

    return deliveries
  }
}