type Credentials = {
  email: string
  password: string
}

type Result = {
  success: string
  error: string
}

export namespace SigninWithEmailAndPassword {
  export type Params = {
    credentials: Credentials
    req: Request
    res?: Response
  }
  export type Return = {
    response: Response
    result: Result
  }
}