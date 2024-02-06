import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RegisterUser } from './dto/RegisterUser.dto';
import { UpdateUser } from './dto/UpdateUser.dto';
import { UserService } from './user.service';
@Controller('/user')
export class UserController {
  // A injeção de dependências ocorre aqui. O UserRepository é injetado no controller
  // através do construtor. Isso desacopla o UserController da criação direta do UserRepository,
  // permitindo maior flexibilidade e facilitando testes unitários.
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  @Post()
  async registerUser(@Body() userData: RegisterUser) {
    const userEntity = await this.userService.registerUser(userData);
    return {
      id: userEntity.id,
      name: userEntity.name,
      message: 'Usuário cadastrado com sucesso!',
    };
  }

  @Get()
  async returnUser() {
    const userSaved = await this.userService.userList();
    return userSaved;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() updateData: UpdateUser) {
    const updatedUser = await this.userService.updateUser(id, updateData);

    return {
      user: updatedUser,
      message: 'Usuário Atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const removeUser = await this.userRepository.deleteUser(id);

    return {
      user: removeUser,
      message: 'usuario removido com sucesso',
    };
  }
}
//                                    1º
// O controlador é o ponto de entrada para as requisições relacionadas aos usuários.
//Ele recebe a requisição, extrai os dados necessários (como parâmetros de rota, parâmetros de consulta, corpo da
//requisição, etc.),  e delega a lógica de negócios aos serviços apropriados.
