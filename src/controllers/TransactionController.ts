import { Request, Response } from "express";
import Transaction from "../models/Transaction";
import TransactionService from "../services/TransactionService";

class TransactionController {
    async createGet(req: Request, res: Response) {
        res.send("NOT IMPLEMENTED: Transaction GET");
    }

    async createPost(req: Request, res: Response) {
        try {
            const { value, sender, receiver } = req.body;

            await TransactionService.createTransaction(new Transaction({
                value,
                sender,
                receiver
            }));

            res.send("Success");
        } catch (error: any) {
            res.send(error.message);
        }
    }
}

export default new TransactionController();