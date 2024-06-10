const db = require("../models");
const CategoryPair = db.CategoryPair;
const Op = db.Sequelize.Op;
const users = require("../controllers/user.controller.js");

// Create and Save a new CategoryPair
exports.create = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if (users.parseJWT(token).accessLevel < 3){
    res.status(500).send({
      message:
        "Not capable!"
    });
  }
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }


  // Create a CategoryPair
  const categoryPairs = {
    newsItemID: req.body.newsItemID,
    topicID: req.body.topicID,
  };

  // Save CategoryPair in the database
  CategoryPair.create(categoryPairs)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the CategoryPair."
      });
    });
};

// Retrieve all CategoryPairs from the database.
exports.findAll = (req, res) => {
  const newsItemID= req.query.newsItemID;
  var condition = newsItemID ? { newsItemID: { [Op.iLike]: `%${newsItemID}%` } } : null;

  CategoryPair.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving CategoryPairs."
      });
    });
};

// Find a single CategoryPairs with an id
exports.findOne = (req, res) => {
  const newsItemID = req.params.newsItemID;
  const topicID = req.params.topicID;

  CategoryPair.findOne({
    where: {
      newsItemID: newsItemID,
      topicID: topicID
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving CategoryPairs with newsItemID = " + newsItemID + " & topicID = " + topicID
      });
    });
};


// Update an CategoryPairs by the id in the request
exports.update = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if (users.parseJWT(token).accessLevel < 3){
    res.status(500).send({
      message:
        "Not capable!"
    });
  }
  const newsItemID = req.params.newsItemID;
  const topicId= req.params.topicID;

  CategoryPair.update(req.body, {
    where: { newsItemID : newsItemID, 
      topicID: topicId
      }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "CategoryPair was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update CategoryPair with newsItemID = ${req.params.newsItemID} & topicID = ${req.params.topicID}. Maybe CategoryPair was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating CategoryPair with " + `newsItemID = ${req.params.newsItemID} & topicID = ${req.params.topicID}`
      });
    });
};

// Delete a CategoryPairs with the specified id in the request
exports.delete = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if (users.parseJWT(token).accessLevel < 3){
    res.status(500).send({
      message:
        "Not capable!"
    });
  }
  const newsItemID = req.query.newsItemID;
  const topicId= req.query.topicID;

  CategoryPair.destroy({
    where: { newsItemID : newsItemID, 
      topicID: topicId
      }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "CategoryPair was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete CategoryPair with newsItemID = ${req.params.newsItemID} & topicID = ${req.params.topicID}. Maybe CategoryPair was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete CategoryPair with newsItemID = ${req.params.newsItemID} & topicID = ${req.params.topicID}`
      });
    });
};

// Delete all CategoryPairs from the database.
exports.deleteAll = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if (users.parseJWT(token).accessLevel < 3){
    res.status(500).send({
      message:
        "Not capable!"
    });
  }
  CategoryPair.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} CategoryPairs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all CategoryPairs."
      });
    });
};

