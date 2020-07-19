import UserAuthenticator from './UserAuthenticator';
import IUsersRepository from '../repositories/IUsersRepository';
import IUsersRepositoryProvider from '../repositories/provider/IUsersRepositoryProvider';
import passwordManipulator from '../utils/password';
import AppError from '../errors/AppError';

const user = {
  email: "mail@company.com",
  password: "123456",
};

let repository: IUsersRepository;
let service: UserAuthenticator;

describe('Users Authenticator', () => {
  beforeEach(() => {
    repository = IUsersRepositoryProvider.mock();
    service = new UserAuthenticator(repository);
    jest.spyOn(passwordManipulator, 'match')
      .mockImplementation((p1, p2) => {
        return Promise.resolve(p1 === p2);
      });
  });

  it('should be able to authenticate a valid user', async () => {
    await repository.save({
      email: user.email,
      hash_password: user.password,
    });
    const token = await service.authenticate(user);
    expect(token).toBeDefined();
  });

  it('should not be able to authenticate an invalid user', async () => {
    await expect(
      service.authenticate(user)
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user with wrong password', async () => {
    await repository.save({
      email: user.email,
      hash_password: user.password,
    });
    await expect(
      service.authenticate({
        email: user.email,
        password: 'wrong password'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
