import IToolsRepository from '../repositories/IToolsRepository';
import ITool from '../models/ITool';

export default class ToolsCreator {
  constructor(
    private repository: IToolsRepository
  ) {}

  public async create(data: Omit<ITool, 'id'>): Promise<ITool> {
    return await this.repository.save(data);
  }
}
