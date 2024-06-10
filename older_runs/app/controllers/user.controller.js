const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Nickname) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const user = {
    Nickname: req.body.Nickname,
    Password: req.body.Password,
    Avatar: "NO",
    BIO: "NO",
    AccessLevel: 1
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// exports.validate = async (req, res) => {
//   const { login, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { Nickname: login, Password: password } });
//     if (user) {
//       res.send(`${user.AccessLevel} ${user.Nickname}`);
//     } else {
//       res.status(400).json({ message: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "An error occurred", error: error.message });
//   }
// };

// Generate the JWT secret key
const jwtSecret = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');

exports.validate = async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await User.findOne({ where: { Nickname: login, Password: password } });
    if (user) {
      const token = jwt.sign({ name: user.Nickname, id: user.ID, accessLevel: user.AccessLevel }, jwtSecret, { expiresIn: '2d' });
      res.send(token);
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

exports.parseJWT = (token) => {
  const decoded = jwt.verify(token, jwtSecret);
  return { name: decoded.name, id: decoded.id, accessLevel: decoded.accessLevel };
};


// New endpoint to extract ID from authorization header
exports.needID = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Extract token from the authorization header
    try {
      const decoded = jwt.verify(token, jwtSecret);
      const userId = decoded.id;
      res.status(200).json({ id: userId });
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    res.status(403).json({ message: "Authorization header is missing" });
  }
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const Nickname = req.query.Nickname;
  var condition = Nickname ? { Nickname: { [Op.iLike]: `%${Nickname}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.query.ID;

  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// Update an User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { ID: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { ID: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};

