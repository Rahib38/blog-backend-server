import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AdminService } from "./admin.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const blockUser =catchAsync(async(req:Request,res:Response)=>{
    const userId=req.params.userId
   const result= await AdminService.blockUser(userId)
    sendResponse(res,{
        success:true,
        message:'user blocked successfully',
        statusCode:StatusCodes.OK,
        data:result
    })
})
const deleteBlog =catchAsync(async(req:Request,res:Response)=>{
    const blogId=req.params.id
   const result= await AdminService.deleteBlog(blogId)
    sendResponse(res,{
        success:true,
        message:'user delete succesFully',
        statusCode:StatusCodes.OK,
        data:result
    })
})

export const AdminController ={
    blockUser,deleteBlog
}