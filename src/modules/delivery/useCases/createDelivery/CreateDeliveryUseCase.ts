import prisma from "../../../../database/prismaClient"

interface ICreateDelivery {
  item_name: string
  id_client: string
}

export default class CreateDelieveryUseCase {
  async execute({ item_name, id_client }: ICreateDelivery) {
    const delivery = await prisma.delivery.create({
      data: {
        item_name,
        id_client
      }
    })

    return delivery
  }
}