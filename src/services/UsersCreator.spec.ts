import UsersCreator from './UsersCreator';
import IUsersRepository from '../repositories/IUsersRepository';
import IUsersRepositoryProvider from '../repositories/provider/IUsersRepositoryProvider';
import AppError from '../errors/AppError';

const user = {
  email: "mail@company.com",
  password: "123456",
};

let repository: IUsersRepository;
let service: UsersCreator;

describe('Users Creator', () => {
  beforeEach(() => {
    repository = IUsersRepositoryProvider.mock();
    service = new UsersCreator(repository);
  });

  it('should be able to save user in the repository', async () => {
    const created = await service.create(user);
    expect(created).toEqual(
      expect.objectContaining({ email: user.email }),
    );
    expect(created).toHaveProperty('id');
    expect(created).toHaveProperty('hash_password');
  });

  it('should not be able to save user with repeated e-mail', async () => {
    await repository.save({
      email: user.email,
      hash_password: user.password,
    });

    await expect(
      service.create(user)
    ).rejects.toBeInstanceOf(AppError);
  });
});
