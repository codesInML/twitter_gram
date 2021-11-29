'use strict';
import {
  Model
} from 'sequelize'

interface CommentAttributes {
  userId: string
  postId?: number
  commentId?: number
  text?: string
  img_url?: string
  id?: number
  createdAt?: Date
  updatedAt?: Date
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Comment extends Model<CommentAttributes> implements CommentAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    userId!: string
    text!: string
    postId!: number

    static associate(models: any) {
      // define association here
      const {User, Post, Love, Comment} = models

      // association with the post
      this.belongsTo(Post, { targetKey: "id", foreignKey: {
        allowNull: false,
        name: "postId"
      } })

      // association with the like
      this.hasMany(Love, { as: "CommentLikes", sourceKey: "id", foreignKey: {
        allowNull: true,
        name: "commentId"
      } })

      // association with the user
      this.belongsTo(User, { targetKey: "userId", foreignKey: {
        allowNull: false,
        name: "userId"
      } })

      // association with the replies
      this.hasMany(Comment, {as: "Reply", sourceKey: "id", foreignKey: {
        allowNull: false,
        name: "commentId"
      }})
    }
  };
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

export interface CommentInput extends CommentAttributes {}
export interface CommentOutput extends Required<CommentAttributes> {}