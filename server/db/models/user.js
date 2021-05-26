const {STRING, UUID, UUIDV4, INTEGER, TEXT} = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: STRING,
    allowNull: false,
  },
//   salt: {
//     type: STRING,
//     allowNull: false,
//   },
  firstName: {
    type: STRING,
    allowNull: false,
  },
  lastName: {
    type: STRING,
    allowNull: false,
  },
  image: {
    type: STRING,
    defaultValue:
      "https://www4.minijuegosgratis.com/v3/games/thumbnails/226277_1.jpg",
  },
});

module.exports = User;