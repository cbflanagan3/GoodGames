const userRouter = require("express").Router();
const {
  models: {User},
} = require("../db/models/index.js");
const bcrypt = require("bcrypt");
const cors = require('cors');
const jwt = require('jsonwebtoken');
userRouter.use(cors());
const bodyParser = require('body-parser');
userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({extended: true}));

process.env.SECRET_KEY = 'secret'

userRouter.get('/', async (req, res, next) => {
  const users = await User.findAll();
  res.send({
      users,
  })
})

userRouter.post('/register', (req, res) => {
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    image: req.body.image,
  }
  User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(user => {
    if(!user) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        userData.password = hash;
        User.create(userData)
        .then(user => {
          res.json({status: user.username + ' Registered'})
        })
        .catch(err => {
            res.send('error: ' + err)
        })
      })
    } else {
      res.json({error: 'User already exists'})
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})

userRouter.post('/login', (req, res) => {
    User.findOne({
      where: {
        username: req.body.username
      }
    })
    .then(user => {
      if (user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        }
      } else {
        res.status(400).json({error: 'User does not exist'})
      }
    })
    .catch(err => {
      res.status(400).json({ error: err })
    })
})

userRouter.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

// userRouter.put("/:id", async (req, res) => {
//   const {id} = req.params;
//   try {
//     if (req.isAuthenticated() && req.user && req.user.id === id) {
//       const {password, salt, username, image, firstName, lastName} = req.body;
//       if (password) {
//         const hash = bcrypt.hashSync(password, salt);
//         await User.update(
//           {
//             ...req.body,
//             password: hash,
//           },
//           {
//             where: {
//               id: id,
//             },
//           }
//         );
//       } else {
//         await User.update(
//           {
//             username,
//             image,
//             firstName,
//             lastName,
//           },
//           {
//             where: {
//               id: id,
//             },
//           }
//         );
//       }
//       res.status(200).send({
//         status: true,
//       });
//     }
//   } catch (e) {
//     console.error(e);
//     res.status(500).send({
//       status: false,
//     });
//   }
// });
module.exports = userRouter;