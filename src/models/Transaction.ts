import db from "../database/database";
import { Schema } from "mongoose";

interface Transaction {
    value: Schema.Types.Decimal128,
    sender: Schema.Types.ObjectId,
    receiver: Schema.Types.ObjectId,
    createdAt: Date
}

const TransactionSchema = new Schema<Transaction>({
    value: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Transaction = db.getDB().model("Transaction", TransactionSchema);

export default Transaction;