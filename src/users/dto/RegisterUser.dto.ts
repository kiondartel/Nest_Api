import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { uniqueEmail } from '../validation/unique-email.validtor';

export class RegisterUser {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsEmail(undefined, { message: 'Email invalido' })
  @uniqueEmail({ message: 'ja existe um usario com este email' })
  email: string;

  @MinLength(6, { message: 'a senha deve ter mais de 6 caracteres' })
  password: string;
}
