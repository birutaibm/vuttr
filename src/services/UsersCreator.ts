import IUsersRepository from 'repositories/IUsersRepository';
import IUser from 'models/IUser';
import passwordManipulator from '../utils/password';
import AppError from '../errors/AppError';

interface IUserCreationDTO {
  email: string;
  password: string;
}

export default class UsersCreator {
  constructor(
    private repository: IUsersRepository
  ) {}

  public async create({ email, password }: IUserCreationDTO): Promise<IUser> {
    const conflictingUser = await this.repository.findByEmail(email);

    if (conflictingUser) {
      throw new AppError('Email address already used.');
    }

    const hash_password = await passwordManipulator.encrypt(password);
    return await this.repository.save({
      email,
      hash_password,
    });
  }
}
