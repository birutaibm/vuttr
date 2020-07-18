import IToolsRepository from '../repositories/IToolsRepository';
import { IToolsRepository as IToolsRepositoryProvider } from '../repositories/provider';
import ToolsDestroyer from './ToolsDestroyer';
import AppError from 'errors/AppError';

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
    const removed = await service.destroy(id);
    expect(removed).toBe(true);
  });

  it('should not be able to remove non-existing tool', async () => {
    await expect(
      service.destroy('non-existingId')
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not remove any tool with different id', async () => {
    const { id } = await repository.save(hotel);
    const removed = await service.destroy(`id different of ${id}`);
    expect(removed).toBe(false);
    const found = await repository.findById(id);
    expect(found).toEqual(
      expect.objectContaining(hotel)
    );
  });
});
