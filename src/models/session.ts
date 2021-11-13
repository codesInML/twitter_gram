'use strict';
import {
  Model, Optional
} from 'sequelize'

interface SessionAttribute {
  id: string
  userId: string
  valid: boolean
  createdAt?: Date
  updatedAt?: Date
  userAgent: string
}

module.exports = (sequelize: any, DataTypes: any ) => {
  class Session extends Model<SessionAttribute> implements SessionAttribute {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: string
    userId!: string
    valid!: boolean
    userAgent!: string

    static associate(models: any) {
      // define association here
      const {User} = models

      // association with the user
      this.hasOne(User, { sourceKey: "userId", foreignKey: {
          allowNull: false,
          name: "userId",
        },
        onDelete: "CASCADE"
      })
    }
  };
  Session.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Session',
  });
  return Session;
};

export interface SessionInput extends Optional<SessionAttribute, 'valid'> {}
export interface SessionOutput extends Required<SessionAttribute>{}