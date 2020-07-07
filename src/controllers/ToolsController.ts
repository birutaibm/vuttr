import { Request, Response } from 'express';

import ToolsRecover from '../services/ToolsRecover';

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
}
