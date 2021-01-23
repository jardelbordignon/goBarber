import {Request, Response, NextFunction} from 'express'
import { verify } from 'jsonwebtoken'

import configAuthentication from '@config/authentication'
import AppError from '@shared/errors/AppError'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

function checkAuthentication(req: Request, res: Response, next: NextFunction): void {

  const autorizacao = req.headers.authorization

  if (!autorizacao)
    throw new AppError('Token JWT não existe', 401)
  
  const [, token] = autorizacao.split(' ') 

  try {
    const decodificado = verify(token, configAuthentication.jwt.secret)
    
    const { sub } = decodificado as ITokenPayload

    req.user = { id: sub }

    return next()
  } catch (err) {
    throw new AppError('Token JWT é inválido: '+err, 401)
  }
}

export default checkAuthentication