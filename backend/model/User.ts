import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    blogs: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }]
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;