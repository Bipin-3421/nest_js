import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    const allUsers = await this.userRepository.find();
    return allUsers;
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
      select: {
        email: true,
        password: true,
      },
    });
    if (!user) throw new NotFoundException('user not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new NotFoundException('password not matched');
    return user;
  }
}
