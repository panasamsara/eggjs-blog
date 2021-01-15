'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/', controller.home.index);
  router.resources('users', '/users', controller.userController );

  router.post('/web/users/getList', controller.userController.index);

  router.post('/login', controller.login.login);
  router.post('/index', jwt, controller.login.index);
};
