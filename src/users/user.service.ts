import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserListDto } from './dto/UserList.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterUser } from './dto/RegisterUser.dto';
import { v4 as uuid } from 'uuid';
import { UpdateUser } from './dto/UpdateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async userList() {
    const users = await this.userRepository.find();
    const list = users.map((users) => new UserListDto(users.id, users.name));

    return list;
  }
  async registerUser(userData: RegisterUser): Promise<UserEntity> {
    const userEntity = new UserEntity();
    userEntity.email = userData.email;
    userEntity.password = userData.password;
    userEntity.name = userData.name;
    userEntity.id = uuid();
    await this.userRepository.save(userEntity);

    return userEntity;
  }
  async updateUser(id: string, updateData: UpdateUser): Promise<UserEntity> {
    await this.userRepository.update(id, updateData);
    return this.userRepository.findOne({ where: { id: id } });
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
