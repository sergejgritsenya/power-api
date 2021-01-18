import Busboy from "busboy"
import { IncomingMessage } from "http"

type TBusboyOnFile = {
  fieldname: string
  file: NodeJS.ReadableStream
  filename: string
  encoding: string
  mimetype: string
}

export const busboyParse = (req: IncomingMessage): Promise<TBusboyOnFile> => {
  return new Promise((resolve, reject) => {
    const busboy = new Busboy({
      headers: req.headers,
      limits: {
        files: 1,
      },
    })

    const cleanup = () => {
      busboy.removeListener("file", onFile)
      busboy.removeListener("error", onError)
    }
    const onFile = (
      fieldname: string,
      file: NodeJS.ReadableStream,
      filename: string,
      encoding: string,
      mimetype: string
    ) => {
      cleanup()
      resolve({ fieldname, file, filename, encoding, mimetype })
    }
    const onError = (err: Error) => {
      cleanup()
      reject(err)
    }

    busboy.once("file", onFile)
    busboy.once("error", onError)
    req.pipe(busboy)
  })
}
