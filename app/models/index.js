const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const models = require("./tutorial.model.js")(sequelize, Sequelize);

db.tutorials = models.Tutorial;
db.users = models.User;
db.topics = models.Topic;
db.newsItems = models.NewsItem;
db.likesDislikess = models.LikesDislikes;
db.userTopicScoress = models.UserTopicScores;
db.CategoryPair = models.CategoryPair;

module.exports = db;
