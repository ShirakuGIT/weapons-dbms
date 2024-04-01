module.exports = (sequelize, Sequelize) => {
    return sequelize.define("weapon_types", {
        type_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type_name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        }
    });
};