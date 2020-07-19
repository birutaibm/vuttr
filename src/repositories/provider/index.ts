import IToolsRepositoryProvider from './IToolsRepositoryProvider';
import IUsersRepositoryProvider from './IUsersRepositoryProvider';

export interface IProvider<T> {
  implementation: T;
  mock: () => T;
}

export const IToolsRepository = IToolsRepositoryProvider;

export const IUsersRepository = IUsersRepositoryProvider;
