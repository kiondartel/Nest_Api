import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UniqueEmailValidator } from './validation/unique-email.validtor';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserRepository, UniqueEmailValidator],
})
export class UserModules {}
