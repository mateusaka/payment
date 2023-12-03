import express from "express";
import UserController from "../controllers/UserController";
import TransactionController from "../controllers/TransactionController";

const router = express.Router();

// INDEX
router.get("/", (req, res) => {
    res.send("NOT IMPLEMENTED: Index");
});

// USER
router.get("/user/create", UserController.createGet);
router.get("/user/id/:id", UserController.findUserById);
router.get("/user/document/:document", UserController.findUserByDocument);

router.post("/user/create", UserController.createPost);

// TRANSACTION
router.get("/transaction/", TransactionController.createGet);

router.post("/transaction/", TransactionController.createPost);


export default router;