import { assert, expect } from "chai";
import { Request, Response } from "express";

import UserController from "../controllers/UserController";
import TransactionController from "../controllers/TransactionController";
import { UserType } from "../models/UserType";

const DOC_COMMON_USER = generateDocument();
const DOC_MERCHANT_USER = generateDocument();

const AN_EXISTING_COMMON_ID_IN_YOUR_DB = "6533af9339a71d573ffc16cf";
const AN_EXISTING_MERCHANT_ID_IN_YOUR_DB = "6533b06e39a71d573ffc16d4";
const AN_EXISTING_DOCUMENT_IN_YOUR_DB = "22222222222";
const COMMON_USER = {
    firstName: "FirstName",
    lastName: "LastName",
    document: DOC_COMMON_USER,
    email: DOC_COMMON_USER + "@email.com",
    password: "password123",
    userType: UserType.COMMON
};
const MERCHANT_USER = {
    firstName: "FirstName",
    lastName: "LastName",
    document: DOC_MERCHANT_USER,
    email: DOC_MERCHANT_USER + "@email.com",
    password: "password123",
    userType: UserType.MERCHANT
};

function generateDocument(): string {
    return Math.floor(10000000000 + Math.random() * 90000000000).toString();
}

describe("TRANSACTION CONTROLLER TESTS", function() {
    it('Should return "Success." for a successfully transaction', async () => {
        const req = {
            body: {
                value: 2.37,
                sender: AN_EXISTING_COMMON_ID_IN_YOUR_DB,
                receiver: AN_EXISTING_MERCHANT_ID_IN_YOUR_DB
            }
        } as Request;

        const res = {
            send: (result: string) => {
                expect(result).to.equal("Success.");
            }
        } as Response;

        await TransactionController.createPost(req, res);
    });

    it('Should return "User is a MERCHANT." due user is a MERCHANT', async () => {
        const req = {
            body: {
                value: 2.37,
                sender: AN_EXISTING_MERCHANT_ID_IN_YOUR_DB,
                receiver: AN_EXISTING_COMMON_ID_IN_YOUR_DB
            }
        } as Request;

        const res = {
            send: (result: string) => {
                expect(result).to.equal("Error: User is a MERCHANT. Aborted transaction.");
            }
        } as Response;

        await TransactionController.createPost(req, res);
    });

    it('Should return "User has no balance." due user has no balance', async () => {
        const req = {
            body: {
                value: 9999999.9999,
                sender: AN_EXISTING_COMMON_ID_IN_YOUR_DB,
                receiver: AN_EXISTING_MERCHANT_ID_IN_YOUR_DB
            }
        } as Request;

        const res = {
            send: (result: string) => {
                expect(result).to.equal("Error: User has no balance. Aborted transaction.");
            }
        } as Response;

        await TransactionController.createPost(req, res);
    });

    it('Should return "Invalid value." due invalid value(1)', async () => {
        const req = {
            body: {
                value: -1,
                sender: AN_EXISTING_COMMON_ID_IN_YOUR_DB,
                receiver: AN_EXISTING_MERCHANT_ID_IN_YOUR_DB
            }
        } as Request;

        const res = {
            send: (result: string) => {
                expect(result).to.equal("Error: Invalid value. Aborted transaction.");
            }
        } as Response;

        await TransactionController.createPost(req, res);
    });

    it('Should return "Invalid value." due invalid value(2)', async () => {
        const req = {
            body: {
                value: 0,
                sender: AN_EXISTING_COMMON_ID_IN_YOUR_DB,
                receiver: AN_EXISTING_MERCHANT_ID_IN_YOUR_DB
            }
        } as Request;

        const res = {
            send: (result: string) => {
                expect(result).to.equal("Error: Invalid value. Aborted transaction.");
            }
        } as Response;

        await TransactionController.createPost(req, res);
    });

    it('Should return "Invalid value." due invalid value(3)', async () => {
        const req = {
            body: {
                value: "1a",
                sender: AN_EXISTING_COMMON_ID_IN_YOUR_DB,
                receiver: AN_EXISTING_MERCHANT_ID_IN_YOUR_DB
            }
        } as Request;

        const res = {
            send: (result: string) => {
                expect(result).to.equal("Error: Invalid value type. Value must be a number.");
            }
        } as Response;

        await TransactionController.createPost(req, res);
    });

    it('Should return "Invalid value." due invalid value(4)', async () => {
        const req = {
            body: {
                value: undefined,
                sender: AN_EXISTING_COMMON_ID_IN_YOUR_DB,
                receiver: AN_EXISTING_MERCHANT_ID_IN_YOUR_DB
            }
        } as Request;

        const res = {
            send: (result: string) => {
                expect(result).to.equal("Error: Invalid value type. Value must be a number.");
            }
        } as Response;

        await TransactionController.createPost(req, res);
    });

    it('Should return "Invalid value." due invalid value(5)', async () => {
        const req = {
            body: {
                value: null,
                sender: AN_EXISTING_COMMON_ID_IN_YOUR_DB,
                receiver: AN_EXISTING_MERCHANT_ID_IN_YOUR_DB
            }
        } as Request;

        const res = {
            send: (result: string) => {
                expect(result).to.equal("Error: Invalid value type. Value must be a number.");
            }
        } as Response;

        await TransactionController.createPost(req, res);
    });
});

describe("USER CONTROLLER TESTS", function() {
    it('Should return "Success." for add a COMMON type user', async () => {        
        const req = { body: COMMON_USER } as Request;

        const res = {
            send: (result: string) => {
                expect(result).to.equal("Success.");
            }
        } as Response;

        await UserController.createPost(req, res);
    });

    it('Should return "Success." for add a MERCHANT type user', async () => {
        const req = { body: MERCHANT_USER } as Request;

        const res = {
            send: (result: string) => {
                expect(result).to.equal("Success.");
            }
        } as Response;

        await UserController.createPost(req, res);
    });

    it('Should return "Document or email already exists." due a user with existing document or email', async () => {
        const req = { body: COMMON_USER } as Request;

        const res = {
            send: (result: string) => {
                expect(result).to.equal("Document or email already exists.");
            }
        } as Response;

        await UserController.createPost(req, res);
    });

    it('Should return "Success." for an existing user', async () => {
        const req = { params: { id: AN_EXISTING_COMMON_ID_IN_YOUR_DB } } as any;

        const res = {
            send: (result: string) => {
                expect(result).to.equal("Success.");
            }
        } as Response;

        await UserController.findUserById(req, res);
    });

    it('Should return "Success." for an existing user', async () => {
        const req = { params: { document: AN_EXISTING_DOCUMENT_IN_YOUR_DB } } as any;

        const res = {
            send: (result: string) => {
                expect(result).to.equal("Success.");
            }
        } as Response;

        await UserController.findUserByDocument(req, res);
    });
});