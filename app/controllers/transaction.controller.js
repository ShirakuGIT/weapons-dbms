const db = require("../models");
const Transaction = db.transactions;

// Create and Save a new Transaction
exports.create = (req, res) => {
    // Validate request
    if (!req.body.weapon_id || !req.body.user_id) {
        res.status(400).send({
            message: "Weapon ID and User ID can not be empty!"
        });
        return;
    }

    // Save Transaction in the database
    Transaction.create(req.body)
        .then(data => {
            res.send(data);
            // Here call the smart contract function if needed for the transaction type
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while recording the Transaction."
            });
        });
};

// ... other CRUD operations ...