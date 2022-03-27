import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface Ipayload {
  sub: string
}

export default async function ensureAuthenticateDeliveryman(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      message: 'Token missing'
    })
  }

  // Token format:
  // [0] = Bearer
  // [1] = Token
  const [, token] = authHeader.split(' ')

  try {
    const { sub } = verify(token, '88fc4070afb7c2e960f7cf55b51624b4') as Ipayload
    req.id_deliveryman = sub

  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token'
    })
  }

  return next()
}