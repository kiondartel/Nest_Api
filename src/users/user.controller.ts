import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RegisterUser } from './dto/RegisterUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
@Controller('/user')
export class UserController {
  // A injeção de dependências ocorre aqui. O UserRepository é injetado no controller
  // através do construtor. Isso desacopla o UserController da criação direta do UserRepository,
  // permitindo maior flexibilidade e facilitando testes unitários.
  constructor(private userRepository: UserRepository) {}

  @Post()
  async registerUser(@Body() userData: RegisterUser) {
    // O decorador @Body() é usado para extrair dados do corpo da requisição HTTP.
    // Isso permite que o método manipule os dados enviados pelo usuário em uma requisição POST.
    const userEntity = new UserEntity();
    userEntity.email = userData.email;
    userEntity.password = userData.password;
    userEntity.name = userData.name;
    userEntity.id = uuid();
    this.userRepository.save(userEntity); // Aqui, o método save do UserRepository injetado é chamado.
    // Isso mostra como a injeção de dependências permite o uso
    // de métodos de uma classe injetada sem a necessidade de
    // criar uma instância diretamente no controller.
    return { id: userEntity.id, message: 'Usuario cadastrado com sucesso!' };
  }

  @Get()
  async returnUser() {
    // Aqui, o método listUsers do UserRepository injetado é chamado para retornar todos os usuários.
    // Mais uma vez, isso demonstra a vantagem da injeção de dependências, pois o UserController
    // não precisa saber como os usuários são armazenados ou recuperados, apenas usa o método fornecido.
    return this.userRepository.listUsers();
  }
}
