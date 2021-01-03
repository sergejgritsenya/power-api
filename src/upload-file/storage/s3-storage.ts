import { S3 } from "aws-sdk"
import { TStorageUploadPromise } from "./storage"

export class AmazonS3Storage {
  private readonly s3: S3
  private readonly s3ImagesBucket: string
  constructor(s3Key: string, s3Secret: string, s3ImagesBucket: string) {
    // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
    this.s3 = new S3({
      accessKeyId: s3Key,
      secretAccessKey: s3Secret,
    })
    this.s3ImagesBucket = s3ImagesBucket
  }

  upload: TStorageUploadPromise = async (data, mimetype, name) => {
    const params: S3.PutObjectRequest = {
      Key: `${name}`,
      Bucket: this.s3ImagesBucket,
      ContentType: mimetype,
      Body: data,
    }
    if (Buffer.isBuffer(data)) {
      params.ContentLength = data.length
    }
    // TODO fix warning https://github.com/mike-marcacci/fs-capacitor#ensuring-cleanup-on-termination-by-process-signal
    try {
      const res = await this.s3.upload(params).promise()
      return res.Location
    } catch (e) {
      console.log("throw", e)
      throw e
    }
  }
}
