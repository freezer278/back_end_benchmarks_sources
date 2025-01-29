import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { randomInt } from './utils/random';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  @Get('api/v1/hello-world')
  getHelloWorld(): any {
    return {
      message: 'Hello World',
    };
  }

  @Get('api/v1/users')
  async getUsersList(): Promise<any> {
    const allItemsCount: number = await this.usersRepository.count();
    const itemsToTake = 30;
    const startId = randomInt(1, allItemsCount - itemsToTake);

    const users = await this.usersRepository
      .createQueryBuilder('users')
      .where('users.id >= :startId', { startId })
      .limit(30)
      .getMany();

    return users;
  }

  @Get('api/v1/jwt')
  async testJwtTokenGenerationAndParsing(): Promise<any> {
    const PRIVATE_KEY = 'some_private_jwt_key_string';

    const userId = 321321;
    const currentTime = Math.floor(Date.now() / 1000);

    const payload = {
      iss: 'http://example.org',
      aud: 'http://example.com',
      iat: currentTime,
      exp: currentTime + 3600,
      sub: userId,
    };
    const algorithm = 'HS256';

    const token = jwt.sign(payload, PRIVATE_KEY, { algorithm });

    const decoded = jwt.verify(token, PRIVATE_KEY, { algorithms: [algorithm] });

    return {
      token,
      decoded,
    };
  }
}
