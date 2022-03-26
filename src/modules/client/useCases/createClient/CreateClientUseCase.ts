import prisma from '../../../../database/prismaClient'
import { hash } from 'bcrypt'

interface ICreateClient {
  username: string
  password: string
}

export default class CreateClientUseCase {
  async execute({ username, password }: ICreateClient) {
    const clientExists = await prisma.client.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive'
        }
      }
    })

    if (clientExists) {
      throw new Error('Client Already Exists')
    }

    const hashedPassword = await hash(password, 10)

    const client = await prisma.client.create({
      data: {
        username,
        password: hashedPassword
      }
    })

    return client
  }
}
