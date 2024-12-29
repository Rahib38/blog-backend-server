import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './blog.service';
import AppError from '../../Errors/appError';
// import { JwtPayload } from "jsonwebtoken";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data)
  const authors = req?.user as JwtPayload;
  console.log(authors)
  if (!authors) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You are not authorized to access this route'
    );
  }

  const result = await BlogService.createBlog(data,authors);
  console.log(result)
  console.log(data,authors)
  const { _id, title, content, author } = result;

  sendResponse(res, {
    success: true,
    message: 'Blog create successfully',
    statusCode: StatusCodes.CREATED,
    data: { _id, title, content, author },
  });
});

export const BlogController = {
  createBlog,
};
