import { NotFoundException, Post, Body, Controller, Get } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from 'src/dto/user/user.dto';
import { LoginUserDto } from 'src/dto/user/userLogin.dto';
import { UserService } from 'src/services/user/user.servive';

@Controller('auth/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return {
      success: true,
      users,
    };
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const createdUser = await this.userService.createUser(
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
    const user = await this.userService.login(email, password);
    return {
      success: true,
      message: `user with email:${email} logged in successfully`,
      user,
    };
  }
}
