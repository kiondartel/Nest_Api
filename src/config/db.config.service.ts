import { Injectable } from '@nestjs/common';

import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class MysqlConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql', // Atenção para o 'mysql' em minúsculas
      host: 'localhost', // Substitua pelo seu host, se necessário
      port: 3306, // Substitua pela sua porta, se diferente
      username: 'root', // Usuário do banco de dados
      password: '123456', // Senha do banco de dados
      database: 'gabrielstore', // Nome do banco de dados
      entities: [__dirname + '/../**/*.entity{.js,.ts}'],
      synchronize: true,
    };
  }
}
