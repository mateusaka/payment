import Transaction from "../models/Transaction";
import User from "../models/User";
import UserService from "./UserService";
import db from "../database/database";

class TransactionService {
    async createTransaction(transaction: Transaction) {
        var session = null;

        try {
            const [
                sender,
                receiver
            ] = await Promise.all([
                UserService.findUserById(transaction.sender),
                UserService.findUserById(transaction.receiver)
            ]);
            
            UserService.validateTransaction(sender, transaction.value);

            if(!this.authorizeTransaction()) {
                throw new Error("Transaction not authorized.");
            }

            session = await db.getDB().startSession();
            session.startTransaction();

            const newTransaction = new Transaction({
                value: transaction.value,
                sender: transaction.sender,
                receiver: transaction.receiver
            });

            await newTransaction.save({
                session: session
            });
            
            // SENDER
            const filterSender = {
                _id: sender
            }

            const updateSender = {
                $inc: {
                    balance: -transaction.value
                }
            }

            const updatedSender = await User.findOneAndUpdate(
                filterSender,
                updateSender,
                {
                    new: true,
                    session: session
                }
            );
            
            // RECEIVER
            const filterReceiver = {
                _id: receiver
            }

            const updateReceiver = {
                $inc: {
                    balance: transaction.value
                }                
            }

            const updatedReceiver = await User.findOneAndUpdate(
                filterReceiver,
                updateReceiver,
                {
                    new: true,
                    session: session
                }
            );

            await session.commitTransaction();
            session.endSession();
        } catch (error) {            
            await session?.abortTransaction();
            session?.endSession();

            throw new Error(error + " Aborted transaction.");
        }
    }

    authorizeTransaction() {
        // External authorizing service

        return true;
    }
}

export default new TransactionService();