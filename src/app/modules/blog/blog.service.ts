import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../Errors/appError';
import { TBlog } from './blog.interface';
import Blog from './blog.model';

const createBlog = async (
  payload: TBlog,
  authorPayload: JwtPayload,
): Promise<TBlog> => {
  const author = authorPayload._id;

  const createBlog = await Blog.create({ ...payload, author });
  const result = await createBlog.populate('author');
  return result;
};
const updateBlog = async (
  blogId: string,
  payload: TBlog,
  loggerUser: JwtPayload,
) => {
  const checkBlogId = await Blog.findById(blogId).populate<{
    author: { email: string; role: string };
  }>('author');
  if (!checkBlogId) {
    throw new AppError(StatusCodes.BAD_GATEWAY, 'Blog not found!');
  } else if (checkBlogId?.author?.email !== loggerUser?.email) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'You are not authorized to update this blog',
    );
  } else if (checkBlogId?.isPublished === false) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'You can not updated this blog.Blog already deleted',
    );
  }
  const updateBlog = await Blog.findByIdAndUpdate(blogId, payload, {
    new: true,
  });
  if (!updateBlog) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Blog not updated');
  }
  const result = await updateBlog.populate('author');
  return result;
};
const deleteBlog = async (
  blogId: string,

  loggerUser: JwtPayload,
) => {
  const checkBlogId = await Blog.findById(blogId).populate<{
    author: { email: string; role: string };
  }>('author');
  if (!checkBlogId) {
    throw new AppError(StatusCodes.BAD_GATEWAY, 'Blog not found!');
  } else if (checkBlogId?.author?.email !== loggerUser?.email) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'You are not authorized to update this blog',
    );
  } else if (checkBlogId?.isPublished === false) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'You can not updated this blog.Blog already deleted',
    );
  }
  await Blog.findByIdAndUpdate(
    blogId,
    { isPublished: false },
    {
      new: true,
    },
  );
};
export const BlogService = {
  createBlog,
  updateBlog,
  deleteBlog,
};
