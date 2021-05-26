const apiRouter = require('express').Router();

apiRouter.use('/games', require('./games'));
apiRouter.use('/users', require('./users'));

module.exports = apiRouter;