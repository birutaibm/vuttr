import ToolsRepository from '../repository/ToolsRepository';

export default class ToolsDestroyer {
  private repository = new ToolsRepository();

  public async destroy(id: string): Promise<boolean> {
    console.log('destroying id', id);
    return await this.repository.deleteId(id);
  }
}
