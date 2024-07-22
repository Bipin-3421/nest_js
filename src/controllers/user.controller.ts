import { Post, Body, Controller, Get, UseGuards, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user/user.dto';
import { LoginUserDto } from 'src/dto/user/userLogin.dto';
import { UserService } from 'src/services/user/user.servive';
import { GenerateToken } from 'src/utils/jwt.helper';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('auth/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly generateToken: GenerateToken,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers(@Req() request: Request) {
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
    const accessToken = await this.generateToken.signIn(user.id, user.name);
    return {
      success: true,
      message: `user with email:${email} logged in successfully`,
      accessToken,
    };
  }
}
