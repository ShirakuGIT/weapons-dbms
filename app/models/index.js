const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false, // This is optional based on Sequelize version
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Model imports
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.weapon = require("./weapon.model.js")(sequelize, Sequelize);  // Import the weapon model
db.weaponType = require("./weapon_type.model.js")(sequelize, Sequelize);  // Import the weapon type model
db.transaction = require("./transaction.model.js")(sequelize, Sequelize);  // Import the transaction model

// Relationship definitions for User and Role
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

// Relationship definitions for Weapon and WeaponType
db.weaponType.hasMany(db.weapon, {
    foreignKey: "type_id"
});
db.weapon.belongsTo(db.weaponType, {
    foreignKey: "type_id"
});

// Relationship definitions for Transaction
db.user.hasMany(db.transaction, {
    foreignKey: "userId"
});
db.weapon.hasMany(db.transaction, {
    foreignKey: "weapon_id"
});
db.transaction.belongsTo(db.user, {
    foreignKey: "userId"
});
db.transaction.belongsTo(db.weapon, {
    foreignKey: "weapon_id"
});

// Enum for roles
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
