// transaction.routes.js
const transactions = require("../controllers/transaction.controller");

module.exports = function (app) {
    // Create a new Transaction
    app.post("/api/transactions", transactions.create);

    // Retrieve all Transactions
    app.get("/api/transactions", transactions.findAll);

    // Retrieve a single Transaction by id
    app.get("/api/transactions/:transaction_id", transactions.findOne);

    // Update a Transaction by id
    app.put("/api/transactions/:transaction_id", transactions.update);

    // Delete a Transaction by id
    app.delete("/api/transactions/:transaction_id", transactions.delete);
};
