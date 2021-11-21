'use strict';
import {
  Model, ModelType
} from 'sequelize'

interface LikeAttributes {
  userId: string
  postId: number
  createdAt?: Date
  updatedAt?: Date
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Like extends Model<LikeAttributes> implements LikeAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    userId!: string
    postId!: number

    static associate(models: ModelType) {
      // define association here
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
  });
  return Like;
};