import { Module } from '@nestjs/common';
import { UserModules } from './users/user.module';

@Module({
  imports: [UserModules], //aqui montamos a arvorde de modules, onde seram chamados
  controllers: [],
  providers: [],
})
export class AppModule {}
