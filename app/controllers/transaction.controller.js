// transaction.controller.js
const db = require("../models");
const Transaction = db.transaction;

// Create and save a new Transaction
exports.create = async (transactionData) => {
    console.log("Hello whatsup!");
    try {
        const transaction = await Transaction.create({
            weapon_id: transactionData.weapon_id,
            user_id: transactionData.user_id,
            transaction_type: transactionData.transaction_type,
            timestamp: transactionData.timestamp,
            notes: transactionData.notes
        });
        console.log(`Transaction logged: ${transaction}`);
        return transaction;
    } catch (err) {
        console.error(`Error creating transaction: ${err.message}`);
        // Handle the error appropriately, such as throwing an exception or returning an error message
        throw new Error(`Error creating transaction: ${err.message}`);
    }
};

// Retrieve all Transactions from the database
exports.findAll = (req, res) => {
    Transaction.findAll()
        .then(transactions => {
            res.send(transactions);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving transactions."
            });
        });
};

// Find a single Transaction with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Transaction.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Transaction with id=" + id
            });
        });
};

// Update a Transaction by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Transaction.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Transaction was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Transaction with id=${id}. Maybe Transaction was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Transaction with id=" + id
            });
        });
};

// Delete a Transaction with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Transaction.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Transaction was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Transaction with id=${id}. Maybe Transaction was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Transaction with id=" + id
            });
        });
};
