import { Module } from '@nestjs/common';
import { UserModules } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConfigService } from './config/db.config.service';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './healthCheck.controller';

@Module({
  imports: [
    UserModules,
    TerminusModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: MysqlConfigService,
      inject: [MysqlConfigService],
    }),
  ], //aqui montamos a arvorde de modules, onde seram chamados
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
