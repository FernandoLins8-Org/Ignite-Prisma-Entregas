import prisma from "../../../../database/prismaClient";

export default class FindClientDeliveriesUseCase {
  async execute(id_client: string) {
    const deliveries = await prisma.delivery.findMany({
      where: {
        id_client
      }
    })

    return deliveries
  }
}