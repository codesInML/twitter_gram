'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Follow extends sequelize_1.Model {
        static associate(models) {
            // define association here
        }
    }
    ;
    Follow.init({
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        followedId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Follow',
    });
    return Follow;
};
