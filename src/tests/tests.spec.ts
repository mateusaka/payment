import { assert, expect } from "chai";

import UserController from "../controllers/UserController";
import { UserType } from "../models/UserType";

const DOC_COMMON_USER = generateDocument();
const DOC_MERCHANT_USER = generateDocument();

const AN_EXISTING_ID_IN_YOUR_DB = "6533af9339a71d573ffc16cf";
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

describe("USER CONTROLLER TESTS", function() {
    it('Should return "Success." for add a COMMON type user', async () => {        
        const req = { body: COMMON_USER } as any;

        const res = {
            send: (result: string) => {
                expect(result).to.equal("Success.");
            }
        } as any;

        await UserController.createPost(req, res);
    });

    it('Should return "Success." for add a MERCHANT type user', async () => {
        const req = { body: MERCHANT_USER } as any;

        const res = {
            send: (result: string) => {
                expect(result).to.equal("Success.");
            }
        } as any;

        await UserController.createPost(req, res);
    });

    it('Should return "Document or email already exists." for add a user with existing document or email', async () => {
        const req = { body: COMMON_USER } as any;

        const res = {
            send: (result: string) => {
                expect(result).to.equal("Document or email already exists.");
            }
        } as any;

        await UserController.createPost(req, res);
    });

    it('Should return "Success." for an existing user', async () => {
        const req = { params: { id: AN_EXISTING_ID_IN_YOUR_DB } } as any;

        const res = {
            send: (result: string) => {
                expect(result).to.equal("Success.");
            }
        } as any;

        await UserController.findUserById(req, res);
    });

    it('Should return "Success." for an existing user', async () => {
        const req = { params: { document: AN_EXISTING_DOCUMENT_IN_YOUR_DB } } as any;

        const res = {
            send: (result: string) => {
                expect(result).to.equal("Success.");
            }
        } as any;

        await UserController.findUserByDocument(req, res);
    });
});