const {db, models} = require('./models');
const bcrypt = require('bcrypt');

const {User} = models;

const sync = async () => {
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("password", salt);
const user = await User.create({
    username: "user@goodgames.com",
    password: 'password',
    firstName: "Default",
    lastName: "User",
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Crash_Bandicoot.png/150px-Crash_Bandicoot.png',
  });
}

const seed = async (force = true) => {
    try {
      await db.sync({force});
      if (force) {
        await sync();
      }
      console.log("seed was successful");
    } catch (e) {
      throw new Error("seed unsuccessful", e);
    }
  };
  
  module.exports = {
      db,
      seed,
      models: {
          User
      }
  }