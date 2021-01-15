'use strict';

module.exports = app => {
    const { router, controller, jwt } = app;

    app.post('/api/users', controller.userController.create);
    app.del('/api/users/:id', 'userController.destroy');
    app.put('/api/users/:id', 'userController.update');
    app.post('/api/users/login', 'userController.login');
    app.get('/api/users/:id', 'userController.find');
    app.get('/api/users/:id/edit', 'userController.find');

    app.post('/api/deleteUser', controller.userController.destroy);

};
