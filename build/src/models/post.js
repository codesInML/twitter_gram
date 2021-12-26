'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Post extends sequelize_1.Model {
        static associate(models) {
            // define association here
            const { User, Comment, Love } = models;
            // association with the user
            this.belongsTo(User, { targetKey: "userId", foreignKey: {
                    allowNull: false,
                    name: "userId"
                } });
            // association with the comment
            this.hasMany(Comment, { sourceKey: "id", foreignKey: {
                    allowNull: false,
                    name: "postId"
                } });
            // association with the likes
            this.hasMany(Love, { as: "PostLikes", sourceKey: "id", foreignKey: {
                    allowNull: true,
                    name: "postId"
                } });
        }
    }
    ;
    Post.init({
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        img_url: {
            type: DataTypes.STRING
        },
        caption: {
            type: DataTypes.STRING
        },
        isARetweet: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        retweetedId: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        numberOfRetweets: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};
