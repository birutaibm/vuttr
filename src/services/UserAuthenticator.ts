import IUsersRepository from 'repositories/IUsersRepository';
import passwordManipulator from 'utils/password';
import { sign } from 'jsonwebtoken';

import authConfig from 'config/auth';

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
      throw new Error('Invalid credentials');
    }
    if (!passwordManipulator.match(password, user.hash_password)) {
      throw new Error('Invalid credentials');
    }
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.email,
      expiresIn,
    });
    return token;
  }
}
