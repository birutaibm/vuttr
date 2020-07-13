import IToolsRepository from "../IToolsRepository";
import ITool from "models/ITool";

const tools: ITool[] = [];

export default class FakeToolsRepository implements IToolsRepository {
  public async getAll(): Promise<ITool[]> {
    return [ ...tools ];
  }

  public async save(tool: Omit<ITool, 'id'>): Promise<ITool> {
    const lastIndex = tools.length - 1;
    const lastId = tools[lastIndex] ? Number(tools[lastIndex].id) : 0;
    const id = (lastId + 1).toString();
    const newTool = { ...tool, id };
    tools.push(newTool);
    return newTool;
  }

  public async findById(id: string): Promise<ITool | undefined> {
    return tools.find(tool => tool.id === id);
  }

  public async deleteId(id: string): Promise<boolean> {
    const index = tools.findIndex(tool => tool.id === id);
    if (index !== -1) {
      tools.splice(index, 1);
      return true;
    }
    return false;
  }
}
