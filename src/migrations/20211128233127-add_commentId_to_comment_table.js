'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.addColumn('Comments', 'commentId', DataTypes.INTEGER)
  },

  down: async (queryInterface, DataTypes) => {
    return queryInterface.removeColumn('Comments', 'commentId') 
  }
};
