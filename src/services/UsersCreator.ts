import IUsersRepository from 'repositories/IUsersRepository';
import IUser from 'models/IUser';
import passwordManipulator from 'utils/password';

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
      throw new Error('Email address already used.');
    }

    const hash_password = await passwordManipulator.encrypt(password);
    return await this.repository.save({
      email,
      hash_password,
    });
  }
}
