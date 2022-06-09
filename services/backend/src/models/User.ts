import { Schema, model } from 'mongoose';

interface IUser {
  firstName: string,
  lastName?: string,
  email: string,
  password: string,
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true, minLength: 3 },
  lastName: { type: String, minLength: 3 },
  email: { type: String, required: true },
  password: { type: String, required: true, minLength: 8 },
});

const User = model<IUser>('User', userSchema);

export default User;
