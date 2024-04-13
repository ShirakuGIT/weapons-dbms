// weapon.routes.js
const weapons = require("../controllers/weapon.controller");

module.exports = function (app) {
    // Create a new Weapon
    app.post("/api/weapons/create", weapons.create);

    // Retrieve all Weapons
    app.get("/api/weapons", weapons.findAll);

    // Retrieve a single Weapon by id
    app.get("/api/weapons/:weapon_id", weapons.findOne);

    // Update a Weapon by id
    app.put("/api/weapons/:weapon_id", weapons.update);

    // Delete a Weapon by id
    app.delete("/api/weapons/:weapon_id", weapons.delete);
};