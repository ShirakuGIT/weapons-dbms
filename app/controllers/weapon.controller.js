const db = require("../models");
const Weapon = db.weapons;

// Create and Save a new Weapon
exports.create = (req, res) => {
    // Validate request
    if (!req.body.serial_number) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Save Weapon in the database
    Weapon.create(req.body)
        .then(data => {
            res.send(data);
            // Here call the smart contract function to log the weapon registration
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Weapon."
            });
        });
};

// ... other CRUD operations ...