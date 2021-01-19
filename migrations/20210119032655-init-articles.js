'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('articles', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        title: STRING(30),
        content: STRING(100),
        tag_ids: STRING(100),
        created_at: DATE,
        updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('articles');
  }
};
