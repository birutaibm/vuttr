import { sign } from 'jsonwebtoken';

import IUsersRepository from '../repositories/IUsersRepository';
import passwordManipulator from '../utils/password';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface UserAuthenticatorDTO {
  email: string;
  password: string;
}

export default class UserAuthenticator {
  constructor(
    private repository: IUsersRepository,
  ) {}

  public async authenticate({ email, password }: UserAuthenticatorDTO) {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }
    const passwordMatch = await passwordManipulator.match(password, user.hash_password);
    if (!passwordMatch) {
      throw new AppError('Invalid credentials', 401);
    }
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.email,
      expiresIn,
    });
    return token;
  }
}
