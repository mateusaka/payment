import { Decimal128, ObjectId } from "mongoose";
import { UserType } from "../models/UserType";
import User from "../models/User";
import Big from "big.js";

class UserService {
    async findUserById(id: ObjectId) {
        try {
            const selectedUser = await User.findOne({
                _id: id
            });            

            if(!selectedUser) {
                throw new Error("User not found by id.");
            }

            return selectedUser;
        } catch (error) {
            throw new Error("Error to find a user.");
        }        
    }

    async findUserByDocument(document: string) {
        try {
            const selectedUser = await User.findOne({
                document
            });

            if(!selectedUser) {
                throw new Error("User not found by document.");
            }

            return selectedUser;
        } catch (error) {
            throw new Error("Error to find a user.");
        }        
    }

    validateTransaction(sender: User, value: Decimal128) {
        const bigValue = Big(value.toString());
        const bigBalance = Big(sender.balance.toString());        

        if(sender.userType == UserType.MERCHANT) {
            throw new Error("User is a MERCHANT.");
        }

        if(bigValue.gt(bigBalance)) {
            throw new Error("User has no balance.");
        }

        if(bigValue.lte(0)) {
            throw new Error("Invalid value.");
        }
    }
}

export default new UserService();