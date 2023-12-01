import db from "../database/database";
import { Schema } from "mongoose";
import { UserType } from "./UserType";

interface User {
    firstName: string,
    lastName: string,
    document: string,
    email: string,
    password: string,
    balance: Schema.Types.Decimal128,
    userType: UserType,
    createdAt: Date
}

const UserSchema = new Schema<User>({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    document: {
        type: String,
        unique: true,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        minLength: 3,
        maxLength: 100
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 100
    },
    balance: {
        type: Schema.Types.Decimal128,
        required: true,
        default: 0
    },
    userType: {
        type: String,
        enum: [
            UserType.COMMON,
            UserType.MERCHANT
        ],
        required: true,
        uppercase: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const User = db.getDB().model("User", UserSchema);

export default User;