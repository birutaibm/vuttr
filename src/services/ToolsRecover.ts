import ToolsRepository from '../repository/ToolsRepository';
import { ITool } from '../models/Tool';

export default class ToolsRecover {
  private repository = new ToolsRepository();

  public async recover(tag?: string): Promise<ITool[]> {
    const tools = await this.repository.getAll();
    if (tag) {
      return tools.filter(tool => tool.tags.includes(tag));
    }
    return [ ...tools ];
  }
}
