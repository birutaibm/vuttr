import ToolsRepository from '../implementations/ToolsRepository';
import FakeToolsRepository from '../mocks/FakeToolsRepository';
import IToolsRepository from '../IToolsRepository';

import { IProvider } from '.';

const IToolsRepositoryProvider: IProvider<IToolsRepository> = {
  implementation: new ToolsRepository(),
  mock: new FakeToolsRepository(),
};

export default IToolsRepositoryProvider;
