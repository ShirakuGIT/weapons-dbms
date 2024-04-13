// weapon_type.routes.js
const weaponTypes = require("../controllers/weapon_type.controller");

module.exports = function (app) {
    // Create a new Weapon Type
    app.post("/api/weaponTypes/create", weaponTypes.create);

    // Retrieve all Weapon Types
    app.get("/api/weaponTypes", weaponTypes.findAll);

    // Retrieve a single Weapon Type by id
    app.get("/api/weaponTypes/:TypeID", weaponTypes.findOne);

    // Update a Weapon Type by id
    app.put("/api/weaponTypes/:TypeID", weaponTypes.update);

    // Delete a Weapon Type by id
    app.delete("/api/weaponTypes/:TypeID", weaponTypes.delete);
};