import { Router } from 'express';
import auth from '../../middlewares/auth';
import { AdminController } from './admin.controller';

const adminRouter = Router();

adminRouter.patch(
  '/users/:userId/block',
  auth('admin'),
  AdminController.blockUser,
);
adminRouter.delete('/blogs/:id', auth('admin'), AdminController.deleteBlog);
export default adminRouter;