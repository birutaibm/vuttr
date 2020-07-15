import { hash, compare } from 'bcryptjs';

const password = {
  encrypt: async (decrypted: string) =>
    await hash(decrypted, 8),
  compare: async (decrypted: string, encrypted: string) =>
    await compare(decrypted, encrypted),
};

export default password;
