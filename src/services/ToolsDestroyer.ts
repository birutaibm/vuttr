import IToolsRepository from "repositories/IToolsRepository";

export default class ToolsDestroyer {
  constructor(
    private repository: IToolsRepository
  ) {}

  public async destroy(id: string): Promise<boolean> {
    return await this.repository.deleteId(id);
  }
}
