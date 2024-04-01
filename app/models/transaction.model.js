module.exports = (sequelize, Sequelize) => {
    return sequelize.define("transactions", {
        transaction_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        weapon_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'weapons',
                key: 'weapon_id'
            }
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        transaction_type: {
            type: Sequelize.STRING
        },
        timestamp: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        notes: {
            type: Sequelize.TEXT
        }
    });
};