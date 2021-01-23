
declare namespace Express {

  // adiciona user/id ao Request do express
  export interface Request {
    user: {
      id: string
    }
  }

}