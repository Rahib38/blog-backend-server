import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';

const blogRouter = Router();
blogRouter.get('/', BlogController.getBlog);
blogRouter.post(
  '/',
  auth('admin', 'user'),
  validateRequest(BlogValidation.createBlogValidation),
  BlogController.createBlog,
);
blogRouter.patch(
  '/:id',
  auth('user', 'admin'),
  validateRequest(BlogValidation.updateBlogValidation),
  BlogController.updateBlog,
);
blogRouter.delete('/:id', auth('user', 'admin'), BlogController.deleteBlog);

export default blogRouter;
