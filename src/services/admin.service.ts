import { Inject, Injectable } from "@nestjs/common"
import { compare } from "bcryptjs"
import { AdminRepository, AuthRepository } from "../data"
import { passwordHashing } from "../utils"
import { TAdminChangePasswordInput, TAdminCreateInput, TAdminUpdateInput } from "./inputs"
import { TAdminListOutput, TAdminOutput } from "./outputs"

@Injectable()
export class AdminService {
  constructor(
    @Inject(AdminRepository) private readonly adminRepository: AdminRepository,
    @Inject(AuthRepository) private readonly authRepository: AuthRepository
  ) {}

  public async findMany(): Promise<TAdminListOutput> {
    return this.adminRepository.findMany()
  }

  public async getOne(id: string): Promise<TAdminOutput> {
    return this.adminRepository.getOneById(id)
  }

  public async createOne(input: TAdminCreateInput): Promise<string> {
    const { login, email, password, confirm_password } = input
    if (password !== confirm_password) {
      throw new Error("Passwords doesn't match")
    }

    const { hash, salt } = passwordHashing(password)

    const create_data = {
      email,
      login,
      password: hash,
      salt,
    }
    return this.adminRepository.createOne(create_data)
  }

  public async updateOne(input: TAdminUpdateInput): Promise<void> {
    return this.adminRepository.updateOne(input)
  }

  public async deleteOne(id: string): Promise<void> {
    const { is_super } = await this.adminRepository.getOneById(id)
    if (is_super) {
      throw new Error("Forbidden")
    }

    return this.adminRepository.deleteOne(id)
  }

  public async changePassword(input: TAdminChangePasswordInput): Promise<void> {
    const { admin_id, confirm_password, new_password, old_password } = input
    if (new_password !== confirm_password) {
      throw new Error("pair doesn't match")
    }

    const password = await this.authRepository.getPasswordByAdminId(admin_id)

    const id_valid = await compare(old_password, password)
    if (!id_valid) {
      throw new Error("pair doesn't match")
    }

    const { hash, salt } = passwordHashing(new_password)

    const update_data = {
      admin_id,
      password: hash,
      salt,
    }

    return this.authRepository.updateOne(update_data)
  }
}
