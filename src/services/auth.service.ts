import { Inject, Injectable } from "@nestjs/common"
import { compare } from "bcryptjs"
import { AdminRepository, AuthRepository } from "../data"
import { generateTokens } from "../utils"
import { TAuthInput, TRefreshInput } from "./inputs"
import { TAuthOutput } from "./outputs"

@Injectable()
export class AuthService {
  constructor(
    @Inject(AdminRepository) private readonly adminRepository: AdminRepository,
    @Inject(AuthRepository) private readonly authRepository: AuthRepository
  ) {}

  public async login(input: TAuthInput): Promise<TAuthOutput> {
    const { login, password } = input

    const admin = await this.adminRepository.getOneByLogin(login)
    const hashed_password = await this.authRepository.getPasswordByLogin(login)

    const pass_valid = await compare(password, hashed_password)
    if (!pass_valid) {
      throw new Error("pair doesn't match")
    }

    return generateTokens({ admin_id: admin.id, is_super: admin.is_super })
  }

  public async refresh(input: TRefreshInput): Promise<TAuthOutput> {
    return generateTokens(input)
  }
}
