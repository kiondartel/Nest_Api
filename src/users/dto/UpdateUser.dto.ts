import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { uniqueEmail } from '../validation/unique-email.validtor';

export class UpdateUser {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsOptional() //Valida apenas se o usuario passar caso contrario nao é requerido
  name: string;

  @IsEmail(undefined, { message: 'Email invalido' })
  @uniqueEmail({ message: 'ja existe um usario com este email' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'a senha deve ter mais de 6 caracteres' })
  @IsOptional()
  password: string;
}
