import express from "express";

const router = express.Router();

// INDEX
router.get("/", (req, res) => {
    res.send("Payment");
});

// USER
/* router.get("/user", UserController.createGet);

router.post("/user", UserController.createPost); */

// TRANSACTION
/* router.get("/transaction", TransactionController.createGet);

router.post("/transaction", TransactionController.createPost); */


export default router;