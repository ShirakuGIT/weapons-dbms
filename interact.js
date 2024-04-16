const { Web3 } = require('web3');
const web3 = new Web3('http://127.0.0.1:7545'); // Connect to the Ganache RPC URL

const contractABI = require('./build/contracts/WeaponRegistry.json').abi;
const contractAddress = '0x5325A9189a9eDBE8682B6b9f51825Ba20E7e1423'; // The current contract address

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function registerWeapon(typeId, serialNumber, manufacturer, model, caliber, currentLocation, status) {
    const accounts = await web3.eth.getAccounts();
    const gasLimit = 1000000; // Set the desired gas limit for the transaction

    try {
        const receipt = await contract.methods.registerWeapon(
            typeId,
            serialNumber,
            manufacturer,
            model,
            caliber,
            currentLocation,
            status
        ).send({
            from: accounts[0],
            gas: gasLimit
        });

        console.log('Weapon registered successfully:', receipt);
        return receipt;
    } catch (error) {
        console.error('Failed to register weapon:', error);
        throw error;
    }
}

async function updateWeaponStatus(weaponId, userId, status, transactionType) {
    const accounts = await web3.eth.getAccounts();
    const gasLimit = 1000000; // Set the desired gas limit for the transaction

    try {
        const receipt = await contract.methods.updateWeaponStatus(
            weaponId,
            userId,
            status,
            transactionType
        ).send({
            from: accounts[0],
            gas: gasLimit
        });

        console.log('Weapon status updated successfully:', receipt);
        return receipt;
    } catch (error) {
        console.error('Failed to update weapon status:', error);
        throw error;
    }
}

// Sample call to register a new weapon
registerWeapon(1, "SN123456", "XYZ Corp", "Model X", "9mm", "Armory", "In Storage")
    .then(receipt => {
        console.log('Weapon registered successfully:', receipt);
    })
    .catch(err => {
        console.error('Error registering weapon:', err);
    });


// Sample call to update the status of an existing weapon
updateWeaponStatus(0, 2, "Deployed", "Status Update")
    .then(receipt => {
        console.log('Weapon status updated successfully:', receipt);
    })
    .catch(err => {
        console.error('Error updating weapon status:', err);
    });
