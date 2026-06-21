import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import User, {IUser} from '../model/User';
import Blog from '../model/Blog';
import { createApiResponse, IApiResponse } from "../utils/ApiResponse.js";
import { userInfo } from 'node:os';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    try{
        const users = await User.find();
        if(!users || users.length === 0){
            return res.status(404).json({success: false, message: 'users not found'});
    }
    return res.status(200).json({success: true, message: 'users fetched successfully'}); 
} catch(err: any){
    console.log(err);
    return res.status(500).json({success: false, message: 'server error while fetching users'});
}}

export const signUp = async(req:Request, res: Response, next: NextFunction): Promise<any> => {
    try{
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({success: false, message: 'User already exist'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            hashedPassword,
            blogs: []
        });

        await user.save();
        return res.status(201).json({success: true, message: 'user successfully create'});
    }catch(err: any){
        return res.status(500).json({ success: false, message: "Server error while signing up" });
  }
};
    

export const logIn = async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    const {email, password} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({success: false, message: 'user not found'});
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({success: false, message: 'invalid credentials'});
        }

        return res.status(200).json({success: true, message: 'user logged in successfully'});
        

    }catch(err: any){
        return res.status(500).json({ success: false, message: "Server error while logging in" });
    }
}


