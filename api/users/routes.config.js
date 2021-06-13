const UsersController = require('./controllers/users.controller');
const config = require('../common/config/env.config');

exports.routesConfig = function (app) {
    app.get('/checkIEMI/:iemi', [
        UsersController.verify
    ]);
};
