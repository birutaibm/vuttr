import ToolsRepository from '../repository/ToolsRepository';
import { ITool } from '../models/Tool';

export default class ToolsRecover {
  private repository = new ToolsRepository();

  public async create(data: Omit<ITool, 'id'>): Promise<ITool> {
    return await this.repository.save(data);
  }
}
