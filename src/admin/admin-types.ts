export type TAdminList = {
  id: string
  login: string
  email: string
  is_super: boolean
}
export type TAdmin = {
  id: string
  login: string
  email: string
  is_super: boolean
}
export type TAdminCreateProps = {
  login: string
  email: string
  password: string
  confirm_password: string
}
export type TAdminUpdateProps = {
  login: string
  email: string
}
export type TAdminChangePasswordProps = {
  old_password: string
  new_password: string
  confirm_password: string
}
