import IToolsRepository from "../IToolsRepository";
import ITool from "models/ITool";

export default class FakeToolsRepository implements IToolsRepository {
  private tools: ITool[];

  constructor() {
    this.tools = [];
  }

  public async getAll(): Promise<ITool[]> {
    return [ ...this.tools ];
  }

  public async save(tool: Omit<ITool, 'id'>): Promise<ITool> {
    const lastIndex = this.tools.length - 1;
    const lastId = this.tools[lastIndex] ? Number(this.tools[lastIndex].id) : 0;
    const id = (lastId + 1).toString();
    const newTool = { ...tool, id };
    this.tools.push(newTool);
    return newTool;
  }

  public async findById(id: string): Promise<ITool | undefined> {
    return this.tools.find(tool => tool.id === id);
  }

  public async deleteId(id: string): Promise<boolean> {
    const index = this.tools.findIndex(tool => tool.id === id);
    if (index !== -1) {
      this.tools.splice(index, 1);
      return true;
    }
    return false;
  }
}
