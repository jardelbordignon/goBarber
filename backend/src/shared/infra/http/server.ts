import 'reflect-metadata'
import express, {Request, Response, NextFunction} from 'express'
import 'express-async-error'
import cors from 'cors'

import configMulter from '@config/multer'
import AppError from '@shared/errors/AppError'
import routes from '@shared/infra/http/routes'

import '@shared/infra/typeorm'
import '@shared/container' //injeção de dependencia

const app = express()

app.use(express.json())
app.use(cors())

app.use('/files', express.static(configMulter.tmpFolder))

app.use(routes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // if (banned.indexOf(message.author.username) >= 0) {
    if (err instanceof AppError) {
        return res.status(err.code).json({
            status: 'error',
            message: err.message
        })
    }

    console.log(err)

    return res.status(500).json({
        status: 'error',
        message: 'Erro interno do servidor'
    })
})

app.listen(3333, () => {
  console.log(' ✨ Server started on port 3333 ')
})