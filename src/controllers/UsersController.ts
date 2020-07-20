import { Request, Response } from 'express';

import { IUsersRepository } from '../repositories/provider';
import UsersCreator from '../services/UsersCreator';
import AppError from '../errors/AppError';

const usersRepository = IUsersRepository.implementation;

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const users = await usersRepository.getAll();
    return response.json(users.map(user => ({ email: user.email })));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    if (process.env.ALLOW_USER_CREATION !== "true") {
      throw new AppError('You can not registry user in this version', 401);
    }

    const { email, password } = request.body;
    const creator = new UsersCreator(usersRepository);
    const user = await creator.create({ email, password });
    return response.status(201).json(user);
  }
}
