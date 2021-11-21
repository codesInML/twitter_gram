'use strict';
import {
  Model
} from 'sequelize'

interface LikeAttributes {
  userId: string
  postId?: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Like extends Model<LikeAttributes> implements LikeAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    userId!: string

    static associate(models: any) {
      // define association here
      const {
        User,
        Post,
        Comment
      } = models

      // association with the user
      this.belongsTo(User, { targetKey: "userId", foreignKey: {
        allowNull: false,
        name: "userId"
      } })

      // association with the post
      this.belongsTo(Post, { targetKey: "id", foreignKey: {
        allowNull: false,
        name: "postId"
      } })

      // association with the comment
      this.belongsTo(Comment, { targetKey: "id", foreignKey: {
        allowNull: false,
        name: "postId"
      } })
    }
  };
  Like.init({
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Like',
    deletedAt: 'deletedTime'
  });
  return Like;
};

export interface LikeInput extends LikeAttributes {
  commentId?: number
}
export interface LikeOutput extends Required<LikeAttributes> {}