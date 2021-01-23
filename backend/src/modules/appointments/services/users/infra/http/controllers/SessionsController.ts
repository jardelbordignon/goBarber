import { Request, Response } from 'express'
import { container } from 'tsyringe'

import SessionsServices from '@modules/users/services/SessionsServices'

export default class SessionsController {

  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
     
    const services = container.resolve(SessionsServices)
    const {user, token} = await services.create({email, password})
  
    return res.json( {user, token} )
  }

}