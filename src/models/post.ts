'use strict';
import {
  Model, Optional
} from 'sequelize'

interface PostAttributes {
  userId: string
  img_url?: string
  caption?: string
  createdAt?: Date
  updatedAt?: Date
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Post extends Model<PostAttributes> implements PostAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    img_url!: string
    caption!: string
    userId!: string

    static associate(models: any) {
      // define association here

      const {User, Comment, Love} = models

      // association with the user
      this.belongsTo(User, { targetKey: "userId", foreignKey: {
        allowNull: false,
        name: "userId"
      } })

      // association with the comment
      this.hasMany(Comment, { sourceKey: "id", foreignKey: {
        allowNull: false,
        name: "postId"
      } })

      // association with the likes
      this.hasMany(Love, { as: "PostLikes", sourceKey: "id", foreignKey: {
        allowNull: true,
        name: "postId"
      } })
    }
  };
  Post.init({
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    img_url: {
      type: DataTypes.STRING
    },
    caption: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};

export interface PostInput extends  PostAttributes {}
export interface PostOutput extends Required<PostAttributes> {}