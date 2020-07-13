import ToolsRepository from '../implementations/ToolsRepository';
import FakeToolsRepository from '../mocks/FakeToolsRepository';
import IToolsRepository from '../IToolsRepository';

interface IProvider<T> {
  implementation: T;
  mock: T;
}

const IToolsRepositoryProvider: IProvider<IToolsRepository> = {
  implementation: new ToolsRepository(),
  mock: new FakeToolsRepository(),
};

export default IToolsRepositoryProvider;
