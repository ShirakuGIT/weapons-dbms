module.exports = (sequelize, Sequelize) => {
    return sequelize.define("weapon_types", {
        type_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type_name: {
            allowNull: false,
            type: Sequelize.STRING
        },
        description: {
            allowNull: false,
            type: Sequelize.TEXT
        }
    });
};