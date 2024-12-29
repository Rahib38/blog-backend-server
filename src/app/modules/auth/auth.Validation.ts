import { z } from 'zod';
import { USER_ROLE } from './auth.interface';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email must be provide' }).email(),
    password: z.string({ required_error: 'Password is required' }),
  }),
});
export const AuthValiditon={
    loginValidationSchema
}
export type TUserRole = keyof typeof USER_ROLE