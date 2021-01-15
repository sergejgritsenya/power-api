export type TEnv = {
  PORT: number
  S3_KEY: string
  S3_SECRET: string
  S3_IMAGES_BUCKET: string
  JWT_SECRET_ADMIN: string
  JWT_SECRET_ADMIN_REFRESH: string
}

export const api_env: TEnv = {
  PORT: 3087,
  S3_KEY: process.env.S3_KEY || "AKIAY23V4LPEKVFR6XF5",
  S3_SECRET: process.env.S3_SECRET || "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",
  S3_IMAGES_BUCKET: process.env.S3_IMAGES_BUCKET || "powerasics",
  JWT_SECRET_ADMIN: process.env.JWT_SECRET_ADMIN || "qwe",
  JWT_SECRET_ADMIN_REFRESH: process.env.JWT_SECRET_ADMIN_REFRESH || "qwe",
}
