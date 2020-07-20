import IToolsRepository from '../repositories/IToolsRepository';
import ITool from '../models/ITool';

export default class ToolsRecover {
  constructor(
    private repository: IToolsRepository
  ) {}

  public async recover(tag?: string): Promise<ITool[]> {
    const tools = await this.repository.getAll();
    if (tag) {
      return tools.filter(tool => tool.tags.includes(tag));
    }
    return [ ...tools ];
  }
}
