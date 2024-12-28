import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);
  const { _id, name, email } = result;

  sendResponse(res, {
    success: true,
    message: 'User register successfully',
    statusCode: StatusCodes.CREATED,
    data: { _id, name, email },
  });
});
const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: StatusCodes.OK,
    data: {
      token: result.token,
    },
  });
});

export const AuthController = {
  register,
  login,
};
