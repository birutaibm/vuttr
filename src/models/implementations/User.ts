import mongoose from 'mongoose';
import IUser from '../IUser';

const UserSchema = new mongoose.Schema({
  email: String,
  hash_password: String,
});

type DocumentUser = IUser & mongoose.Document;

export function extractInfo(registry: DocumentUser | null) : IUser | undefined {
  if (registry) {
    return {
      id: registry._id,
      email: registry.email,
      hash_password: registry.hash_password,
    };
  }
  return undefined;
}

export default mongoose.model<DocumentUser>('User', UserSchema);
