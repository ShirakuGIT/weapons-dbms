// weapon.controller.js
const db = require("../models");
const Weapon = db.weapon;

// Create and save a new Weapon
exports.create = (req, res) => {
    const { TypeID, SerialNumber, Manufacturer, Model, Caliber, CurrentLocation, Status } = req.body;

    // Validate request
    if (!TypeID || !SerialNumber || !Manufacturer || !Model || !Caliber || !CurrentLocation || !Status) {
        res.status(400).send({ message: "All fields are required." });
        return;
    }

    // Create a Weapon
    const weapon = {
        TypeID,
        SerialNumber,
        Manufacturer,
        Model,
        Caliber,
        CurrentLocation,
        Status
    };

    Weapon.create(weapon)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Weapon."
            });
        });
};

// Retrieve all Weapons from the database
exports.findAll = (req, res) => {
    Weapon.findAll()
        .then(weapons => {
            res.send(weapons);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving weapons."
            });
        });
};

// Find a single Weapon with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Weapon.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Weapon with id=" + id
            });
        });
};

// Update a Weapon by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Weapon.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Weapon was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Weapon with id=${id}. Maybe Weapon was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Weapon with id=" + id
            });
        });
};

// Delete a Weapon with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Weapon.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Weapon was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Weapon with id=${id}. Maybe Weapon was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Weapon with id=" + id
            });
        });
};
