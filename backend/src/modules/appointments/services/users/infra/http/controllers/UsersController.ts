
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UsersServices from '@modules/users/services/UsersServices'
import UserAvatarsServices from '@modules/users/services/UserAvatarsServices'

export default class UsersController {

  public async index(req: Request, res: Response) {
    const services = container.resolve(UsersServices)
    
    const users = await services.find()
    
    return res.json(users)
  }


  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body
  
    const services = container.resolve(UsersServices)
  
    const user = await services.create({ name, email, password })
    
    return res.json(user)
  }


  public async updateAvatar(req: Request, res: Response) {
    const services = container.resolve(UserAvatarsServices)

    const user = await services.updateAvatar({
      user_id: req.user.id,
      filename: req.file.filename
    })
  
    return res.status(200).json(user)
  }

}