'use strict';
import {
  Model, Optional
} from 'sequelize'

interface PostAttributes {
  userId: string
  img_url: string
  caption: string
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
    }
  };
  Post.init({
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a link to your image'
        },
        notEmpty: {
          msg: "image cannot be empty"
        }
      }
    },
    caption: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};

export interface PostInput extends  Optional<Required<PostAttributes>, "createdAt" | "updatedAt"> {}
export interface PostOutput extends Required<PostAttributes> {}