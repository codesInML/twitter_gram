'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Comment extends sequelize_1.Model {
        static associate(models) {
            // define association here
            const { User, Post, Love, Comment } = models;
            // association with the post
            this.belongsTo(Post, { targetKey: "id", foreignKey: {
                    allowNull: false,
                    name: "postId"
                } });
            // association with the like
            this.hasMany(Love, { as: "CommentLikes", sourceKey: "id", foreignKey: {
                    allowNull: true,
                    name: "commentId"
                } });
            // association with the user
            this.belongsTo(User, { targetKey: "userId", foreignKey: {
                    allowNull: false,
                    name: "userId"
                } });
            // association with the replies
            this.hasMany(Comment, { as: "Reply", sourceKey: "id", foreignKey: {
                    allowNull: false,
                    name: "commentId"
                } });
        }
    }
    ;
    Comment.init({
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        img_url: {
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        commentId: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};
