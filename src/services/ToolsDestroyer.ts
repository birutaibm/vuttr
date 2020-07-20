import IToolsRepository from '../repositories/IToolsRepository';
import AppError from '../errors/AppError';

export default class ToolsDestroyer {
  constructor(
    private repository: IToolsRepository
  ) {}

  public async destroy(id: string): Promise<void> {
    const success = await this.repository.deleteId(id);
    if (!success) {
      throw new AppError(`Can not find tool with id ${id}`, 404);
    }
  }
}
