import { NotFoundException, Post, Body, Controller } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from 'src/dto/user/user.dto';
import { AuthService } from 'src/services/auth/auth.servive';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
