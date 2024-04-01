module.exports = app => {
    const weapons = require("../controllers/weapon.controller.js");
    var router = require("express").Router();

    // Create a new Weapon
    router.post("/", weapons.create);

    // ... other weapon routes ...

    app.use('/api/weapons', router

);
};