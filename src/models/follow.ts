'use strict';
import {
  Model
} from 'sequelize'

interface FollowAttributes {
  userId: string
  followedId: string
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Follow extends Model<FollowAttributes> implements FollowAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    userId!: string
    followedId!: string

    static associate(models: any) {
      // define association here
    }
  };
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

export interface FollowInput extends Required<FollowAttributes> {}