import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user.controller';
import { User } from 'src/entities/user/user.entity';
import { UserService } from 'src/services/user/user.servive';
import { GenerateToken } from 'src/utils/jwt.helper';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, GenerateToken],
})
export class UserModule {}
