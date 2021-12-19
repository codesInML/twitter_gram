'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Love extends sequelize_1.Model {
        static associate(models) {
            // define association here
            const { User, Post, Comment } = models;
            // association with the user
            this.belongsTo(User, { targetKey: "userId", foreignKey: {
                    allowNull: false,
                    name: "userId"
                } });
            // association with the post
            this.belongsTo(Post, { targetKey: "id", foreignKey: {
                    allowNull: true,
                    name: "postId"
                } });
            // association with the comment
            this.belongsTo(Comment, { targetKey: "id", foreignKey: {
                    allowNull: true,
                    name: "commentId"
                } });
        }
    }
    ;
    Love.init({
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER
        },
        commentId: {
            type: DataTypes.INTEGER
        },
    }, {
        sequelize,
        modelName: 'Love',
    });
    return Love;
};
