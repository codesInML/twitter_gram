'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Session extends sequelize_1.Model {
        static associate(models) {
            // define association here
            const { User } = models;
            // association with the user
            this.hasOne(User, { sourceKey: "userId", foreignKey: {
                    allowNull: false,
                    name: "userId",
                },
                onDelete: "CASCADE"
            });
        }
    }
    ;
    Session.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        valid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        userAgent: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Session',
    });
    return Session;
};
