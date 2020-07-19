import IUsersRepository from 'repositories/IUsersRepository';
import MongoUser, { extractInfo } from '../../models/implementations/User';
import IUser from '../../models/IUser';

export default class UsersRepository implements IUsersRepository {
  public async getAll() {
    const users = await MongoUser.find();
    return users.map(extractInfo)
      .filter(user => user !== undefined) as IUser[];
  }

  public async findById(id: string) {
    return extractInfo(await MongoUser.findById(id));
  }

  public async findByEmail(email: string) {
    const users = await MongoUser.find({ email });
    if (users) {
      return extractInfo(users[0]);
    }
    return undefined;
  }

  public async save(user: Omit<IUser, 'id'>) {
    const created = await MongoUser.create(user);
    return extractInfo(created) as IUser;
  }
}
