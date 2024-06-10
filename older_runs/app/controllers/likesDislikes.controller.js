const db = require("../models");
const users = require("../controllers/user.controller.js");
const LikesDislikes = db.likesDislikess;
const Op = db.Sequelize.Op;
const UserTopicScores= db.userTopicScoress;

// Create and Save a new LikesDislikes
exports.create = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if (users.parseJWT(token).accessLevel < 3){
    res.status(500).send({
      message:
        "Not capable!"
    });
  }
  //Validate request
  if (!req.body.LikeDislike) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }


  // Create a LikesDislikes
  const likesDislikes = {
    newsItemID: req.body.newsItemID,
    userID: req.body.userID,
    LikeDislike: req.body.LikeDislike
  };

  // Save LikesDislikes in the database
  LikesDislikes.create(likesDislikes)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the LikesDislikes."
      });
    });
};

// Retrieve all LikesDislikess from the database.
exports.findAll = (req, res) => {
  const newsItemID= req.query.newsItemID;
  var condition = newsItemID ? { newsItemID: { [Op.iLike]: `%${newsItemID}%` } } : null;

  LikesDislikes.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving likesDislikess."
      });
    });
};

// Find a single LikesDislikes with an id
exports.findOne = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if (users.parseJWT(token).accessLevel < 3){
    res.status(500).send({
      message:
        "Not capable!"
    });
  }
  const newsItemID = req.params.newsItemID;
  const userID = req.params.userID;

  LikesDislikes.findOne({
    where: {
      newsItemID: newsItemID,
      userID: userID
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving LikesDislikes with newsItemID = " + newsItemID + " & userID = " + userID
      });
    });
};


// Update an LikesDislikes by the id in the request
exports.update = (req, res) => {
  const newsItemID = req.params.newsItemID;
  const userId = req.params.userID;
  const token = req.headers.authorization.split(' ')[1];
  req.params.LikeDislike = req.params.LikeDislike % 3;

  if (users.parseJWT(token).id != userId) {
    res.status(500).send({
      message: "Not authorized!" + users.parseJWT(token).id + " " + userId
    });
  }

  LikesDislikes.findOrCreate({
    where: { newsItemID: newsItemID, userID: userId },
    defaults: req.body
  })
    .then(([likesDislikes, created]) => {
      if (created) {
        res.send({
          message: "LikesDislikes was created successfully."
        });
      } else {
        if (likesDislikes.LikeDislike == req.body.LikeDislike) {
          likesDislikes.destroy() // Remove existing entity
            .then(() => {
              res.send({
                message: "deleted"
              });
            })
            .catch(err => {
              res.status(500).send({
                message: "Error deleting existing LikesDislikes"
              });
            });
        } else {
          likesDislikes.update(req.body)
            .then(() => {
              res.send({
                message: "LikesDislikes was updated successfully." + likesDislikes.LikeDislike + " " + req.body.LikeDislike
              });
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating LikesDislikes with " + `newsItemID = ${req.params.newsItemID} & userID = ${req.params.userID}`
              });
            });
        }
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error finding or creating LikesDislikes"
      });
    });
};


// Delete a LikesDislikes with the specified id in the request
exports.delete = (req, res) => {
  
  const newsItemID = req.params.newsItemID;
  const userId= req.params.userID;

  const token = req.headers.authorization.split(' ')[1];
  if (users.parseJWT(token).userId != userId){
    res.status(500).send({
      message:
        "Not capable!"
    });
  }

  LikesDislikes.destroy({
    where: { newsItemID : newsItemID, 
      userID: userId
      }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "LikesDislikes was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete LikesDislikes with newsItemID = ${req.params.newsItemID} & userID = ${req.params.userID}. Maybe LikesDislikes was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete LikesDislikes with newsItemID = ${req.params.newsItemID} & userID = ${req.params.userID}`
      });
    });
};

// Delete all LikesDislikess from the database.
exports.deleteAll = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if (users.parseJWT(token).accessLevel < 3){
    res.status(500).send({
      message:
        "Not capable!"
    });
  }
  LikesDislikes.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} LikesDislikess were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all likesDislikess."
      });
    });
};

