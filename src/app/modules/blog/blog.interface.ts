import { Types } from 'mongoose';

export type TBlog = {
  title: string;
  content: string;
  _id: Types.ObjectId;
  isPublished: boolean;
  author:Record<string,unknown>|undefined
};
