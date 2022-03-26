import prisma from '../../../database/prismaClient'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface IAuthenticateDeliveryman {
  username: string
  password: string
}

export default class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive'
        }
      }
    })

    if (!deliveryman) {
      throw new Error('Username or password invalid')
    }

    const passwordIsCorrect = await compare(password, deliveryman.password)
    if (!passwordIsCorrect) {
      throw new Error('Username or password invalid')
    }

    const token = sign({ username }, 'b1e5de809ac479ffaa492037f3f9dfea', {
      subject: deliveryman.id,
      expiresIn: '1d'
    })

    return token
  }
}