export type TEnv = {
  PORT: number
  S3_KEY: string
  S3_SECRET: string
  S3_IMAGES_BUCKET: string
  JWT_SECRET_ADMIN: string
  JWT_SECRET_ADMIN_REFRESH: string
}

export const config: TEnv = {
  PORT: Number(process.env.PORT) || 3088,
  S3_KEY: process.env.S3_KEY || "",
  S3_SECRET: process.env.S3_SECRET || "",
  S3_IMAGES_BUCKET: process.env.S3_IMAGES_BUCKET || "",
  JWT_SECRET_ADMIN: process.env.JWT_SECRET_ADMIN || "secret",
  JWT_SECRET_ADMIN_REFRESH: process.env.JWT_SECRET_ADMIN_REFRESH || "refresh",
}
