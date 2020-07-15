import UsersRepository from '../implementations/UsersRepository';
import FakeUsersRepository from '../mocks/FakeUsersRepository';
import IUsersRepository from '../IUsersRepository';

import { IProvider } from '.';

const IUsersRepositoryProvider: IProvider<IUsersRepository> = {
  implementation: new UsersRepository(),
  mock: new FakeUsersRepository(),
};

export default IUsersRepositoryProvider;
