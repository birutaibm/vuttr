import MongoTool, { ITool, extractInfo } from '../models/Tool';

export default class ToolsRepository {
  public async getAll(): Promise<ITool[]> {
    const mongoTools = await MongoTool.find();
    return mongoTools
      .map(tool => extractInfo(tool))
      .filter(tool => tool !== undefined) as ITool[];
  }

  public async save(tool: Omit<ITool, 'id'>): Promise<ITool> {
    const mongoCreated = await MongoTool.create(tool);
    const mongoTool = extractInfo(mongoCreated) as ITool;
    return mongoTool;
  }

  public async findById(id: string): Promise<ITool | undefined> {
    const mongoFound = await MongoTool.findById(id);
    return extractInfo(mongoFound);
  }

  public async deleteId(id: string): Promise<boolean> {
    const mongoDeleted = await MongoTool.deleteOne({ _id: id });
    return mongoDeleted.deletedCount === 1;
  }
}
