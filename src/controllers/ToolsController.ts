import { Request, Response } from 'express';

import ToolsRecover from '../services/ToolsRecover';
import ToolsCreator from '../services/ToolsCreator';
import ToolsDestroyer from '../services/ToolsDestroyer';

interface Tool {
  id: string,
  title: string,
  link: string,
  description: string,
  tags: string[]
}

export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const tag = request.query.tag?.toString();
    const recover = new ToolsRecover();
    const tools = await recover.recover(tag);
    return response.json(tools);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, link, description, tags } = request.body;
    const creator = new ToolsCreator();
    const tool = await creator.create({ title, link, description, tags });
    return response.json(tool);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const destroyer = new ToolsDestroyer();
    const success = await destroyer.destroy(id);
    return success ? response.sendStatus(204) : response.sendStatus(404);
  }
}
