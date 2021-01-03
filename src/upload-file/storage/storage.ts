import { AWSError, S3 } from "aws-sdk"
import { Request } from "aws-sdk/lib/request"

export type TStorageUploadPromise = (
  data: NodeJS.ReadableStream | Buffer,
  mimetype: string,
  name: string
) => Promise<TUloadLocation>

type TUloadLocation = string

// export type TStorageGetStream = (type: UPLOAD_TYPE, name: TUploadName) => Readable
type TAwsS3StorageRequest = Request<S3.Types.GetObjectOutput, AWSError>
type TStorageGetStream = (name: string) => TAwsS3StorageRequest

export interface IFileStorage {
  upload: TStorageUploadPromise
  getStream: TStorageGetStream
}
