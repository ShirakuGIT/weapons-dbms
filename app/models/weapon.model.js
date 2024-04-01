module.exports = (sequelize, Sequelize) => {
    return sequelize.define("weapons", {
        weapon_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'weapon_types',
                key: 'type_id'
            }
        },
        serial_number: {
            type: Sequelize.STRING
        },
        manufacturer: {
            type: Sequelize.STRING
        },
        model: {
            type: Sequelize.STRING
        },
        caliber: {
            type: Sequelize.STRING
        },
        current_location: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: 'In Stock'
        }
    });
};