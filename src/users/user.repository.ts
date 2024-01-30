import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable() // a class se torna um provider pois o decorator Injectable a transforma
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async listUsers() {
    return this.users;
  }

  async emailExists(email: string) {
    const isUser = this.users.find((user) => user.email === email);
    return isUser !== undefined;
  }
}
