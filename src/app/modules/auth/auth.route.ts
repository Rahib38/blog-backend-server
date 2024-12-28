import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from '../user/user.validation';
import { AuthValiditon } from './auth.Validation';

const authRouter = Router();

authRouter.post(
  '/register',
  validateRequest(userValidation.userValidationSchema),
);
authRouter.post('/login', validateRequest(AuthValiditon.loginValidationSchema));

export default authRouter;
