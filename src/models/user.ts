'use strict';
import {
  Model, Optional
} from 'sequelize'

require('dotenv').config()

import bcrypt from 'bcrypt'

interface UserAttribute {
  userId: string
  firstName: string
  lastName: string
  email: string
  password: string
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
  validatePassword?: Function
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttribute> implements UserAttribute {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    userId!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    isActive!: boolean;
    validatePassword: any;

    static associate(models: any) {
      // define association here
      const {Session, User, Post, Follow} = models

      // association with the session
      this.hasMany(Session, { sourceKey: "userId", foreignKey: {
        allowNull: false,
        name: "userId"
      } })

      // association with the post
      this.hasMany(Post, { sourceKey: "userId", foreignKey: {
        allowNull: false,
        name: "userId"
      } })

      // user association with user (Follow)
      this.belongsToMany(User, {as: "User", foreignKey: "userId", sourceKey: "userId", targetKey: "userId", through: Follow})
      this.belongsToMany(User, {as: "Followed", foreignKey: "followedId", sourceKey: "userId", targetKey: "userId", through: Follow})
    }

    toJSON () {
      return { ...this.get(), password: undefined }
    }

  };
  User.init({
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your first name'
        },
        notEmpty: {
          msg: "first name cannot be empty"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your last name'
        },
        notEmpty: {
          msg: "last name cannot be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your email name'
        },
        notEmpty: {
          msg: "email name cannot be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your password name'
        },
        notEmpty: {
          msg: "password name cannot be empty"
        }
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  // hash the password
  User.beforeCreate(async (user, options) => {
    const saltWorkFactor: number = parseInt(<string>process.env.SALT_WORK_FACTOR)
    const salt = await bcrypt.genSalt(saltWorkFactor)
    user.password = await bcrypt.hash(user.password, salt);
  });

  // compare the passwords 
  User.prototype.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
  }
  
  return User;
};

export interface UserInput extends Optional<UserAttribute, 'userId'> {}
export interface UserOutput extends Required<UserAttribute>{}