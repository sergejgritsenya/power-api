export type TAuthAdmin = {
  admin_id: string
  is_super: boolean
}

export type HasAuthAdmin = {
  admin?: TAuthAdmin
}
