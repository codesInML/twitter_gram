'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    return Promise.all([
      queryInterface.addColumn('Posts', 'isARetweet', DataTypes.BOOLEAN),
      queryInterface.addColumn('Posts', 'retweetedId', DataTypes.INTEGER),
      queryInterface.addColumn('Posts', 'numberOfRetweets', DataTypes.INTEGER),
    ])
  },

  down: async (queryInterface, DataTypes) => {
    return Promise.all([
      queryInterface.removeColumn('Posts', 'isARetweet', DataTypes.BOOLEAN),
      queryInterface.removeColumn('Posts', 'retweetedId', DataTypes.INTEGER),
      queryInterface.removeColumn('Posts', 'numberOfRetweets', DataTypes.INTEGER),
    ])
  }
};
