'use strict';

module.exports = app => {
    const { router, controller, jwt } = app;

    app.post('/api/saveArticle', controller.articleController.create);
    app.post('/api/getArticles', controller.articleController.getArticles);
    // app.del('/api/articles/:id', 'articleController.destroy');
    app.post('/api/updateArticle', controller.articleController.update);
    // app.get('/api/articles/:id', 'articleController.find');
    // app.get('/api/articles/:id/edit', 'articleController.find');

    // app.post('/api/deleteArticle', controller.articleController.destroy);

};
