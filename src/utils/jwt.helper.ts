import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateToken {
  constructor(private jwtService: JwtService) {}

  async signIn(id: string, name: string): Promise<{ access_token: string }> {
    const payload = { sub: id, name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
