import { genSaltSync, hashSync } from "bcryptjs"

type THashedPassword = {
  salt: string
  hash: string
}

export const passwordHashing = (password: string): THashedPassword => {
  const salt = genSaltSync(16)
  const hash = hashSync(password, salt)
  return { salt, hash }
}
