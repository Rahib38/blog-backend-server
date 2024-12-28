import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from '../user/user.validation';
import { AuthValiditon } from './auth.Validation';
import { AuthController } from './auth.controller';

const authRouter = Router();

authRouter.post(
  '/register',
  validateRequest(userValidation.userValidationSchema),AuthController.register
);
authRouter.post('/login', validateRequest(AuthValiditon.loginValidationSchema),AuthController.login);

export default authRouter;
