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

  private searchUser(id: string) {
    const user = this.users.find((salveUser) => salveUser.id === id);
    if (!user) {
      throw new Error('usuario nao encontrado');
    }
    return user;
  }

  async update(id: string, updateData: Partial<UserEntity>) {
    // ao usar Partial voce deixa opcional as propriedades da tipagem
    const user = this.searchUser(id);

    Object.entries(updateData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }
      user[key] = value;
    });

    return user;
  }
  async deleteUser(id: string) {
    const user = this.searchUser(id);
    this.users = this.users.filter((salveUser) => salveUser.id !== id);
    return user;
  }
}
