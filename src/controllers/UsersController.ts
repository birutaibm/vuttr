import { Request, Response } from 'express';

import { IUsersRepository } from '../repositories/provider';
import UsersCreator from '../services/UsersCreator';

const usersRepository = IUsersRepository.implementation;

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const users = await usersRepository.getAll();
    return response.json(users.map(user => ({ email: user.email })));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const creator = new UsersCreator(usersRepository);
    const user = await creator.create({ email, password });
    return response.status(201).json(user);
  }
}
