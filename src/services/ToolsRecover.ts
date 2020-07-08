import ToolsRepository, { Tool } from '../repository/ToolsRepository';

export default class ToolsRecover {
  private repository = new ToolsRepository();

  public async recover(tag?: string): Promise<Tool[]> {
    const tools = await this.repository.getAll();
    if (tag) {
      return tools.filter(tool => tool.tags.includes(tag));
    }
    return [ ...tools ];
  }
}
