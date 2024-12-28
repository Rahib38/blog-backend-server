import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    trim: true,
  },
});

const Blog = model<TBlog>('Blog', blogSchema);
export default Blog;
