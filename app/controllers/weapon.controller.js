// weapon.controller.js
const db = require("../models");
const Weapon = db.weapon;
const transactionController = require("../controllers/transaction.controller");

const { Web3 } = require('web3');
const web3 = new Web3('http://127.0.0.1:7545'); // Connect to the Ganache RPC URL

// Assuming the ABI and contract address are set up correctly.
const contractABI = require('../../build/contracts/WeaponRegistry.json').abi;
const contractAddress = '0x74bDB248004234506A469e16225aE63B722bb961'; // The current contract address
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Helper function to get the default account
async function getDefaultAccount() {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
}

// Function to call the smart contract to delete a weapon
async function decommissionWeaponBlockchain(weaponId) {
    const accounts = await web3.eth.getAccounts();
    const receipt = await contract.methods.decommissionWeapon(weaponId).send({
        from: accounts[0],
        gas: 1000000
    });

    return receipt;
}

// retrieve transaction data based on weapon ID or other identifiers
async function getBlockchainData(weaponId) {
    const receipt = await contract.methods.getWeaponDetails(weaponId).call();
    return {
        transactionHash: receipt.transactionHash,
        // other details you might need
    };
}



// Integration with create function
exports.create = async (req, res) => {
    const { type_id, serial_number, manufacturer, model, caliber, current_location, status } = req.body;

    if (!type_id || !serial_number) {
        res.status(400).send({ message: "type_id and serial_number are required fields." });
        return;
    }

    try {
        const fromAccount = await getDefaultAccount();
        const receipt = await contract.methods.registerWeapon(
            type_id, serial_number, manufacturer, model, caliber, current_location, status
        ).send({ from: fromAccount, gas: 1000000 }); // Adjust gas as needed

        console.log('Blockchain transaction successful:', receipt);

        // Proceed to create weapon in the PostgreSQL database
        const weapon = await Weapon.create({
            type_id,
            serial_number,
            manufacturer,
            model,
            caliber,
            current_location,
            status
        });
        res.status(201).send(weapon);
    } catch (err) {
        console.error('Failed to create weapon:', err);
        res.status(500).send({ message: err.message || "Some error occurred while creating the Weapon." });
    }
};

// Retrieve all Weapons from the database
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
};;


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

// Integration with update function
exports.update = async (req, res) => {
    const id = parseInt(req.params.weapon_id, 10);    
    console.log(id);

    try {
        const weaponToUpdate = await Weapon.findByPk(id);
        if (!weaponToUpdate) {
            console.log(`Weapon with id=${id} was not found.`);
            return res.status(404).send({
                message: `Weapon with id=${id} was not found.`
            });
        }

        const statusBeforeUpdate = weaponToUpdate.status;
        console.log(`Previous status: ${statusBeforeUpdate}`);

        const [num] = await Weapon.update(req.body, { where: { weapon_id: id } });
        console.log(`Logging transaction...`);
        await transactionController.create({
            weapon_id: id,
            user_id: req.body.user_id,
            transaction_type: 'Status Update',
            timestamp: new Date(),
            notes: `Status changed from ${statusBeforeUpdate} to ${req.body.status}`,
        });

        if (num === 1) {
            const fromAccount = await getDefaultAccount();
            const receipt = await contract.methods.updateWeaponStatus(
                id, req.body.user_id, req.body.status, 'Status Update'
            ).send({ from: fromAccount, gas: 1000000 });

            console.log('Blockchain transaction successful:', receipt);
            res.send({ message: "Weapon was updated successfully." });
        } else {
            console.log(`No changes made to the weapon with ID: ${id}.`);
            res.send({ message: `Cannot update Weapon with id=${id}.` });
        }
    } catch (err) {
        console.error(`Error updating weapon with ID: ${id}`, err);
        res.status(500).send({
            message: `Error updating Weapon with id=${id}.`
        });
    }
};




// Delete a Weapon with the specified id in the request
exports.delete = async (req, res) => {
    const id = parseInt(req.params.weapon_id, 10);

    try {
        // Decommission the weapon on the blockchain
        const blockchainReceipt = await decommissionWeaponBlockchain(id);
        console.log('Blockchain decommission transaction receipt:', blockchainReceipt);

        res.send({
            message: "Weapon was decommissioned successfully!"
        });
    } catch (err) {
        console.error("Error decommissioning weapon:", err);
        res.status(500).send({
            message: "Could not decommission Weapon with id=" + id
        });
    }
};