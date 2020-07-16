import { Request, Response } from 'express';

import UserAuthenticator from 'services/UserAuthenticator';
import { IUsersRepository } from 'repositories/provider';

const authenticator = new UserAuthenticator(IUsersRepository.implementation);

export default class SessionsController {
  public async create(request: Request, response: Response) {
    const { email, password } = request.body;
    try {
      const token = await authenticator.authenticate({ email, password });

      return response.status(201).json({ user: email, token });
    } catch (error) {
      console.log(error);
      return response.sendStatus(401);
    }
  }
}
