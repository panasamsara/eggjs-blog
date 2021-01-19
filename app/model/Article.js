'use strict';

module.exports = app => {
   const { STRING, INTEGER, DATE } = app.Sequelize;

   const Article = app.model.define('Article', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      title: STRING(30),
      content: STRING(100),
      tag_ids: STRING(100),
      created_at: DATE,
      updated_at: DATE,
   });

   return Article;
};