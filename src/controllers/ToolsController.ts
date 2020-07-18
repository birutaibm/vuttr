import { Request, Response } from 'express';

import { IToolsRepository } from '../repositories/provider';
import ToolsRecover from '../services/ToolsRecover';
import ToolsCreator from '../services/ToolsCreator';
import ToolsDestroyer from '../services/ToolsDestroyer';

const toolsRepository = IToolsRepository.implementation;

export default class ToolsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const tag = request.query.tag?.toString();
    const recover = new ToolsRecover(toolsRepository);
    const tools = await recover.recover(tag);
    return response.json(tools);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, link, description, tags } = request.body;
    const creator = new ToolsCreator(toolsRepository);
    const tool = await creator.create({ title, link, description, tags });
    return response.status(201).json(tool);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const destroyer = new ToolsDestroyer(toolsRepository);
    await destroyer.destroy(id);
    return response.sendStatus(204);
  }
}
