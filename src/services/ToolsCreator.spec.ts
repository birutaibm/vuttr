import ToolsCreator from './ToolsCreator';
import IToolsRepository from '../repositories/IToolsRepository';
import IToolsRepositoryProvider from '../repositories/provider/IToolsRepositoryProvider';

const hotel = {
  title: "hotel",
  link: "https://github.com/typicode/hotel",
  description: "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
  tags:["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
};

let repository: IToolsRepository;
let service: ToolsCreator;

describe('Tools Creator', () => {
  beforeEach(() => {
    repository = IToolsRepositoryProvider.mock;
    service = new ToolsCreator(repository);
  });

  it('should be able to save tool in the repository', async () => {
    const created = await service.create(hotel);
    expect(created).toEqual(
      expect.objectContaining(hotel),
    );
    expect(created).toHaveProperty('id');
  });
});
