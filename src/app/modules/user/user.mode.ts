import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    isBlocked: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);
const User = model<TUser>('User', userSchema);

export default User;
