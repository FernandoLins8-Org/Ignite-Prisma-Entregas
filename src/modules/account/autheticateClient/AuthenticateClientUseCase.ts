import prisma from '../../../database/prismaClient'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface IAuthenticateClient {
  username: string
  password: string
}

export default class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    const client = await prisma.client.findFirst({
      where: {
        username
      }
    })

    if (!client) {
      throw new Error('Username or password invalid')
    }

    const passowrdIsCorrect = await compare(password, client.password)

    if (!passowrdIsCorrect) {
      throw new Error('Username or password invalid')
    }

    // Gerar token
    const token = sign({ username }, 'b1e5de809ac479ffaa492037f3f9dfea', {
      subject: client.id,
      expiresIn: '1d'
    })

    return token
  }
}