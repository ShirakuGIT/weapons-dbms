module.exports = app => {
    const transactions = require("../controllers/transaction.controller.js");
    var router = require("express").Router();

    // Record a new Transaction
    router.post("/", transactions.create);

    // ... other transaction routes ...

    app.use('/api/transactions', router);
};