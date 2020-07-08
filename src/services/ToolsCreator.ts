import ToolsRepository, { Tool } from '../repository/ToolsRepository';

export default class ToolsRecover {
  private repository = new ToolsRepository();

  public async create(data: Omit<Tool, 'id'>): Promise<Tool> {
    return await this.repository.save(data);
  }
}
