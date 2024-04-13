// weapon.controller.js
const db = require("../models");
const Weapon = db.weapon;
const transactionController = require("../controllers/transaction.controller");


// Assuming your create function looks something like this
exports.create = (req, res) => {
    // Extract type_id, serial_number, and other required fields from the request body
    const { type_id, serial_number, manufacturer, model, caliber, current_location, status } = req.body;

    // Validate request
    if (!type_id || !serial_number) {
        res.status(400).send({ message: "type_id and serial_number are required fields." });
        return;
    }

    // Create a Weapon
    Weapon.create({
        type_id,
        serial_number,
        manufacturer,
        model,
        caliber,
        current_location,
        status
    })
    .then(weapon => {
        res.status(201).send(weapon);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while creating the Weapon." });
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

exports.update = async (req, res) => {
    const id = parseInt(req.params.weapon_id, 10); // Parse the weapon_id to integer    
    console.log(id);
    try {
        const weaponToUpdate = await Weapon.findByPk(id);
        console.log(`Updating weapon with ID: ${id}`);

        if (!weaponToUpdate) {
            console.log(`Weapon with id=${id} was not found.`);
            return res.status(404).send({
                message: `Weapon with id=${id} was not found.`
            });
        }

        const statusBeforeUpdate = weaponToUpdate.status;
        console.log(`Previous status: ${statusBeforeUpdate}`);

        const [num] = await Weapon.update(req.body, {
            where: { weapon_id: id }
        });

        console.log(`Logging transaction...`);
        await transactionController.create({
            weapon_id: id,
            user_id: req.body.user_id, // Make sure this is correctly populated
            transaction_type: 'Status Update',
            timestamp: new Date(),
            notes: `Status changed from ${statusBeforeUpdate} to ${req.body.status}`,
        });

        if (num === 1) {
            console.log(`Weapon with ID: ${id} was updated successfully.`);
            res.send({
                message: "Weapon was updated successfully."
            });
        } else {
            console.log(`No changes made to the weapon with ID: ${id}.`);
            res.send({
                message: `Cannot update Weapon with id=${id}.`
            });
        }
    } catch (err) {
        console.error(`Error updating weapon with ID: ${id}`, err);
        res.status(500).send({
            message: `Error updating Weapon with id=${id}.`
        });
    }
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
