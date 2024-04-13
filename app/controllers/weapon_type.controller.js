// weaponType.controller.js
const db = require("../models");
const WeaponType = db.weaponType;

exports.create = (req, res) => {
    const { type_name, description } = req.body; // Use the correct field names here

    // Validate request
    if (!type_name || !description) {
        res.status(400).send({ message: "type_name and description are required fields." });
        return;
    }

    // Create a Weapon Type
    WeaponType.create({ 
        type_name, // Match the field name in the model
        description // Match the field name in the model
    })
    .then(weaponType => {
        res.status(201).send(weaponType);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while creating the Weapon Type." });
    });
};


exports.findAll = (req, res) => {
    // Find all Weapon Types
    WeaponType.findAll()
        .then(weaponTypes => {
            res.send(weaponTypes);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving Weapon Types." });
        });
};

exports.findOne = (req, res) => {
    const TypeID = req.params.TypeID;

    // Find a single Weapon Type by ID
    WeaponType.findByPk(TypeID)
        .then(weaponType => {
            if (!weaponType) {
                res.status(404).send({ message: `Weapon Type with ID ${TypeID} not found.` });
            } else {
                res.send(weaponType);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || `Error retrieving Weapon Type with ID ${TypeID}.` });
        });
};

exports.update = (req, res) => {
    const TypeID = req.params.TypeID;
    const { TypeName, Description } = req.body;

    // Update Weapon Type by ID
    WeaponType.update({ TypeName, Description }, { where: { TypeID } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Weapon Type was updated successfully." });
            } else {
                res.status(404).send({ message: `Cannot update Weapon Type with ID ${TypeID}. Maybe Weapon Type was not found or req.body is empty.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || `Error updating Weapon Type with ID ${TypeID}.` });
        });
};

exports.delete = (req, res) => {
    const TypeID = req.params.TypeID;

    // Delete Weapon Type by ID
    WeaponType.destroy({ where: { TypeID } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Weapon Type was deleted successfully." });
            } else {
                res.status(404).send({ message: `Cannot delete Weapon Type with ID ${TypeID}. Maybe Weapon Type was not found.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || `Error deleting Weapon Type with ID ${TypeID}.` });
        });
};
