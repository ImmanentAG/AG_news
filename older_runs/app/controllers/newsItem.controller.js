const db = require("../models");
const NewsItem = db.newsItems;
const Op = db.Sequelize.Op;

// Create and Save a new NewsItem
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Heading) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a NewsItem
  const newsItem = {
    Heading: req.body.Heading,
    Illustration: req.body.Illustration,
    MainText: req.body.MainText,
    PromotionalBoost: 1
  };
  
  delete req.body.ID;

  // Save NewsItem in the database
  NewsItem.create(newsItem)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the NewsItem."
      });
    });
};

// Retrieve all NewsItems from the database.
exports.findAll = (req, res) => {
  const Heading = req.query.Heading;
  var condition = Heading ? { Heading: { [Op.iLike]: `%${Heading}%` } } : null;

  NewsItem.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving newsItems."
      });
    });
};

// Find a single NewsItem with an id
exports.findOne = (req, res) => {
  const id = req.query.ID;

  NewsItem.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving NewsItem with id=" + id
      });
    });
};

// Update an NewsItem by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  NewsItem.update(req.body, {
    where: { ID: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "NewsItem was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update NewsItem with id=${id}. Maybe NewsItem was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating NewsItem with id=" + id
      });
    });
};

// Delete a NewsItem with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  NewsItem.destroy({
    where: { ID: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "NewsItem was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete NewsItem with id=${id}. Maybe NewsItem was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete NewsItem with id=" + id
      });
    });
};

// Delete all NewsItems from the database.
exports.deleteAll = (req, res) => {
  NewsItem.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} NewsItems were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all newsItems."
      });
    });
};

