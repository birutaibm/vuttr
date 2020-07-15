import IUsersRepository from "repositories/IUsersRepository";
import IUser from "models/IUser";

const users: IUser[] = [];

export default class FakeUsersRepository implements IUsersRepository {
  public async getAll() {
    return [ ...users ]
  }

  public async findById(id: string) {
    return users.find(user => user.id === id);
  }

  public async findByEmail(email: string) {
    return users.find(user => user.email === email);
  }

  public async save(user: Omit<IUser, 'id'>) {
    const lastIndex = users.length - 1;
    const lastId = users[lastIndex] ? Number(users[lastIndex].id) : 0;
    const id = (lastId + 1).toString();
    const newUser = { ...user, id };
    users.push(newUser);
    return newUser;
  }
}
