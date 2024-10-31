import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { randomInt } from './utils/random';
import { InjectRepository } from '@nestjs/typeorm';

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
}
