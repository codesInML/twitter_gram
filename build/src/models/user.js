'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require('dotenv').config();
const bcrypt_1 = __importDefault(require("bcrypt"));
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        static associate(models) {
            // define association here
            const { Session, User, Post, Follow, Comment, Love } = models;
            // association with the session
            this.hasMany(Session, { sourceKey: "userId", foreignKey: {
                    allowNull: false,
                    name: "userId"
                } });
            // association with the post
            this.hasMany(Post, { sourceKey: "userId", foreignKey: {
                    allowNull: false,
                    name: "userId"
                } });
            // user association with user (Follow)
            this.belongsToMany(User, { as: "User", foreignKey: "userId", sourceKey: "userId", targetKey: "userId", through: Follow });
            this.belongsToMany(User, { as: "Followed", foreignKey: "followedId", sourceKey: "userId", targetKey: "userId", through: Follow });
            // user association with the comments
            this.hasMany(Comment, { sourceKey: "userId", foreignKey: {
                    allowNull: false,
                    name: "userId"
                } });
            // user association with the likes
            this.hasMany(Love, { as: "Likes", sourceKey: "userId", foreignKey: {
                    allowNull: false,
                    name: "userId"
                } });
        }
        toJSON() {
            return Object.assign(Object.assign({}, this.get()), { password: undefined });
        }
    }
    ;
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
    User.beforeCreate((user, options) => __awaiter(void 0, void 0, void 0, function* () {
        const saltWorkFactor = parseInt(process.env.SALT_WORK_FACTOR);
        const salt = yield bcrypt_1.default.genSalt(saltWorkFactor);
        user.password = yield bcrypt_1.default.hash(user.password, salt);
    }));
    // compare the passwords 
    User.prototype.validatePassword = function (password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(password, this.password);
        });
    };
    return User;
};
