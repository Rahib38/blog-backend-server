
import bcrypt from 'bcrypt';
import { TUser } from '../user/user.interface';
import User from '../user/user.mode';
import jwt from 'jsonwebtoken'
import config from '../../config';

const register = async (payload: TUser) => {
  const result = (await User.create(payload));
  return result;
};
const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload?.email }).select('+password');
  if (!user) {
    throw new Error('This user is not found');
  }
  const userStatus = user?.isBlocked;
  if (userStatus) {
    throw new Error('This user is blocked!');
  }
  console.log(payload,payload?.password,
    user?.password)
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );
  if (!isPasswordMatched) {
    throw new Error('Wrong Password!!!');
  }
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    _id:user?._id
  }
// console.log("jwtPayload")
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: '7d' });
// console.log("token")
  return {token, user};
};
export const AuthService = {
  register,
  login,
};
