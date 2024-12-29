import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../Errors/appError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './blog.service';
// import { JwtPayload } from "jsonwebtoken";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const authors = req?.user as JwtPayload;
  if (!authors) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You are not authorized to access this route',
    );
  }

  const result = await BlogService.createBlog(data, authors);

  const { _id, title, content, author } = result;

  sendResponse(res, {
    success: true,
    message: 'Blog create successfully',
    statusCode: StatusCodes.CREATED,
    data: { _id, title, content, author },
  });
});

const updateBlog=catchAsync(async(req:Request,res:Response)=>{
  const blogId=req.params.id
  const payload=req.body
  const authors = req?.user as JwtPayload
  const result = await BlogService.updateBlog(blogId,payload,authors)
  const { _id, title, content, author }=result
  sendResponse(res, {
    success: true,
    message: 'Blog update successfully',
    statusCode: StatusCodes.OK,
    data: { _id, title, content, author },
  });
})
const deleteBlog=catchAsync(async(req:Request,res:Response)=>{
  const blogId=req.params.id
  const authors = req?.user as JwtPayload
  const result = await BlogService.deleteBlog(blogId,authors)
  // const { _id, title, content, author }=result
  sendResponse(res, {
    success: true,
    message: 'Blog delete successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
})

export const BlogController = {
  createBlog,updateBlog,deleteBlog
};
