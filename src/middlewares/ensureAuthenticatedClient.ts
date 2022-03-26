import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export default async function ensureAuthenticatedClient(req: Request, res: Response, next: NextFunction) {
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
    const { sub } = verify(token, 'b1e5de809ac479ffaa492037f3f9dfea') as IPayload
    req.id_client = sub

  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token'
    })
  }

  return next()
}