'use strict';
import {
  Model
} from 'sequelize'

interface PostAttributes {
  img_url: string
  caption: string
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

    static associate(models: any) {
      // define association here
    }
  };
  Post.init({
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