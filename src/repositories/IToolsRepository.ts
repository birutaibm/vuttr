import ITool from 'models/ITool';

export default interface IToolsRepository {
  getAll: () => Promise<ITool[]>;
  save: (tool: Omit<ITool, 'id'>) => Promise<ITool>;
  findById: (id: string) => Promise<ITool | undefined>;
  deleteId: (id: string) => Promise<boolean>;
}
