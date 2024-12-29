import { StatusCodes } from "http-status-codes"
import AppError from "../../Errors/appError"
import User from "../user/user.mode"
import Blog from "../blog/blog.model"

const blockUser=async(userId:string)=>{
    const checkUser = await User.findById(userId)
    if(!checkUser){
        throw new AppError(StatusCodes.BAD_REQUEST,"User Not found")
    }else if(checkUser.isBlocked){
        throw new AppError(StatusCodes.BAD_REQUEST,"User is Blocked")
    }
    const updateBlog = await User.findByIdAndUpdate(userId,{isBlocked:true},{new:true})
    if(!updateBlog){
        throw new AppError(StatusCodes.BAD_REQUEST,"user not blocked! try again later......👻")
    }
}
const deleteBlog=async(userId:string)=>{
const checkBlog = await Blog.findById(userId)
if(!checkBlog){
    throw new AppError(StatusCodes.BAD_REQUEST,"Blog Not found")
}else if(checkBlog?.isPublished===false){
    throw new AppError(StatusCodes.BAD_REQUEST,"Blog already deleted")
}

const updateBlog = await Blog.findByIdAndUpdate(userId,{isPublished:false},{new:true})
if(!updateBlog){
    throw new AppError(StatusCodes.BAD_REQUEST,"Blog not deleted") 
}
}
export const AdminService={
    blockUser, deleteBlog
}