import { Request, Response } from "express";
import User from "../models/User";

class UserController {
    async createGet(req: Request, res: Response) {
        res.send("NOT IMPLEMENTED: User GET");
    }

    async createPost(req: Request, res: Response) {
        try {
            const {
                firstName,
                lastName,
                document,
                email,
                password,
                userType
            } = req.body;

            const selectedUser = await User.findOne({
                $or: [
                    {document},
                    {email}
                ]                
            });

            if(selectedUser) {
                return res.send("Document or email already exists.");
            }

            const user = new User({
                firstName,
                lastName,
                document,
                email,
                password,
                userType
            });

            await user.save();

            res.send("Success.");
        } catch (error: any) {
            res.send(error.message);
        }
    }

    async findUserById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            
            const selectedUser = await User.findOne({
                _id: id
            });

            if(!selectedUser) {
                res.send("User not found");
            }

            res.send("Success.");
        } catch (error: any) {
            res.send(error.message);
        }
    }

    async findUserByDocument(req: Request, res: Response) {
        try {
            const document = req.params.document;

            const selectedUser = await User.findOne({
                document
            });

            if(!selectedUser) {
                res.send("User not found");
            }

            res.send("Success.");
        } catch (error: any) {
            res.send(error.message);
        }
    }
}

export default new UserController();