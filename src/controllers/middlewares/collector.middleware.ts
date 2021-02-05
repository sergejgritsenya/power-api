import axios from "axios"
import { NextFunction, Request, Response } from "express"

export const collectorMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const url = process.env.COLLECTOR_URL
    console.log(req.ip)
    if (url) {
      await axios.post(url, { ip: req.ip })
    }
    next()
  } catch (_err) {
    next()
  }
}
