import { Body, Controller, Get, Post } from "@nestjs/common"
import { AuthService } from "../../services"
import { LoginRequest } from "./requests"

@Controller("control/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  public async login(@Body() request: LoginRequest) {
    return this.authService.login(request)
  }

  @Get("refresh")
  public async refresh() {
    const input = { admin_id: "", is_super: false }
    return this.authService.refresh(input)
  }
}
