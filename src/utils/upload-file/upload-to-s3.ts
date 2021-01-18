import { IncomingMessage } from "http"
import * as mime from "mime-types"
import { generateRandomStringToken } from ".."
import { config } from "../../config"
import { AmazonS3Storage, busboyParse } from "./storage"

export const uploadToS3 = async (req: IncomingMessage): Promise<string> => {
  const s3Storage = new AmazonS3Storage(config.S3_KEY, config.S3_SECRET, config.S3_IMAGES_BUCKET)
  const { file, mimetype } = await busboyParse(req)
  const name = generateRandomStringToken()
  const ext = mime.extension(mimetype) || "false"
  const url = await s3Storage.upload(file, mimetype, `${name}.${ext}`)
  return url
}
