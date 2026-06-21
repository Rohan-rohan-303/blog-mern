import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    description: string;
    image: string;
    user: Types.ObjectId;
    date: Date;

}

const blogSchema = new Schema<IBlog>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now }
});

const Blog = mongoose.model<IBlog>('Blog', blogSchema);
export default Blog;