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
module.exports = {
    up: (queryInterface, DataTypes) => __awaiter(void 0, void 0, void 0, function* () {
        return Promise.all([
            queryInterface.addColumn('Posts', 'isARetweet', DataTypes.BOOLEAN),
            queryInterface.addColumn('Posts', 'retweetedId', DataTypes.INTEGER),
            queryInterface.addColumn('Posts', 'numberOfRetweets', DataTypes.INTEGER),
        ]);
    }),
    down: (queryInterface, DataTypes) => __awaiter(void 0, void 0, void 0, function* () {
        return Promise.all([
            queryInterface.removeColumn('Posts', 'isARetweet', DataTypes.BOOLEAN),
            queryInterface.removeColumn('Posts', 'retweetedId', DataTypes.INTEGER),
            queryInterface.removeColumn('Posts', 'numberOfRetweets', DataTypes.INTEGER),
        ]);
    })
};