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

    const token = sign({ username }, '88fc4070afb7c2e960f7cf55b51624b4', {
      subject: deliveryman.id,
      expiresIn: '1d'
    })

    return token
  }
}