const User = require('./user');
const db = require('../db');

module.exports = {
    db,
    models: { User }
}