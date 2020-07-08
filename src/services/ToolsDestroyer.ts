import ToolsRepository from '../repository/ToolsRepository';

export default class ToolsDestroyer {
  private repository = new ToolsRepository();

  public async destroy(id: string): Promise<boolean> {
    return await this.repository.deleteId(id);
  }
}
