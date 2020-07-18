import AppError from '../errors/AppError';
import IToolsRepository from '../repositories/IToolsRepository';
import IToolsRepositoryProvider from '../repositories/provider/IToolsRepositoryProvider';
import ToolsDestroyer from './ToolsDestroyer';

const hotel = {
  title: "hotel",
  link: "https://github.com/typicode/hotel",
  description: "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
  tags:["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
};

let repository: IToolsRepository;
let service: ToolsDestroyer;

describe('Tools Destroyer', () => {
  beforeEach(() => {
    repository = IToolsRepositoryProvider.mock;
    service = new ToolsDestroyer(repository);
  });

  it('should be able to remove tool from the repository', async () => {
    const { id } = await repository.save(hotel);
    await service.destroy(id);
    const found = await repository.findById(id);
    expect(found).toBeUndefined();
  });

  it('should not be able to remove non-existing tool', async () => {
    await expect(
      service.destroy('non-existingId')
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not remove any tool with different id', async () => {
    const { id } = await repository.save(hotel);
    await expect(
      service.destroy(`id different of ${id}`)
    ).rejects.toBeInstanceOf(AppError);
    const found = await repository.findById(id);
    expect(found).toEqual(
      expect.objectContaining(hotel)
    );
  });
});
