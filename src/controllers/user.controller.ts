import { NotFoundException, Post, Body, Controller, Get } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from 'src/dto/user/user.dto';
import { AuthService } from 'src/services/auth/auth.servive';
import { LoginUserDto } from 'src/dto/user/userLogin.dto';

@Controller('auth/user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getAllUsers() {
    const users = await this.authService.getAllUsers();
    return {
      success: true,
      users,
    };
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const createdUser = await this.authService.createUser(
      name,
      email,
      password,
    );
    return {
      success: true,
      message: `user with email:${email} registered successfully`,
      createdUser,
    };
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.authService.login(email, password);
    return {
      success: true,
      message: `user with email:${email} logged in successfully`,
      user,
    };
  }
}
