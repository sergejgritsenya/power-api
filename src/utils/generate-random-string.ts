const crypto = require("crypto")

export const generateRandomStringToken = (): string => {
  const buf: Buffer = crypto.randomBytes(16)
  return buf.toString("hex")
}
