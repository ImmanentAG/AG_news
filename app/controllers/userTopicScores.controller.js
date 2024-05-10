const db = require("../models");
const UserTopicScores= db.userTopicScoress;
const Op = db.Sequelize.Op;

// Create and Save a new UserTopicScores
exports.create = (req, res) => {
  // Validate request
  if (!req.body.TopicRating) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }


  // Create a UserTopicScores
  const userTopicScores= {
    topicID: req.body.topicID,
    userID: req.body.userID,
    TopicRating: req.body.TopicRating
  };

  // Save UserTopicScores in the database
  UserTopicScores.create(userTopicScores)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the UserTopicScores."
      });
    });
};

// Retrieve all UserTopicScores from the database.
exports.findAll = (req, res) => {
  const topicID= req.query.topicID;
  var condition = topicID ? { topicID: { [Op.iLike]: `%${topicID}%` } } : null;

  UserTopicScores.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving UserTopicScoress."
      });
    });
};

// Find a single UserTopicScores with an id
exports.findOne = (req, res) => {
  const topicID = req.params.topicID;
  const userID = req.params.userID;

  UserTopicScores.findOne({
    where: {
      topicID: topicID,
      userID: userID
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving UserTopicScores with topicID = " + topicID + " & userID = " + userID
      });
    });
};


// Update an UserTopicScores by the id in the request
exports.update = (req, res) => {
  const topicID = req.params.topicID;
  const userId= req.params.userID;

  UserTopicScores.update(req.body, {
    where: { topicID : topicID, 
      userID: userId
      }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "UserTopicScores was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update UserTopicScores with topicID = ${req.params.topicID} & userID = ${req.params.userID}. Maybe LikesDislikes was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating UserTopicScores with " + `topicID = ${req.params.topicID} & userID = ${req.params.userID}`
      });
    });
};

// Delete a UserTopicScores with the specified id in the request
exports.delete = (req, res) => {
  const topicID = req.params.topicID;
  const userId= req.params.userID;

  UserTopicScores.destroy({
    where: { topicID : topicID, 
      userID: userId
      }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "UserTopicScores was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete UserTopicScores with topicID = ${req.params.topicID} & userID = ${req.params.userID}. Maybe UserTopicScores was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete UserTopicScores with topicID = ${req.params.topicID} & userID = ${req.params.userID}`
      });
    });
};

// Delete all UserTopicScoress from the database.
exports.deleteAll = (req, res) => {
  UserTopicScores.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} UserTopicScoress were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all UserTopicScoress."
      });
    });
};

