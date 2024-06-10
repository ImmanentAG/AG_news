module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  const User = sequelize.define("user", {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Nickname: {
      type: Sequelize.STRING
    },
    Password: {
      type: Sequelize.STRING
    },
    Avatar: {
      type: Sequelize.STRING
    },
    BIO: {
      type: Sequelize.TEXT
    },
    AccessLevel: {
      type: Sequelize.INTEGER
    }
  });

  const Topic = sequelize.define("topic", {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: Sequelize.STRING
    }
  });

  const NewsItem = sequelize.define("newsItem", {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Heading: {
      type: Sequelize.STRING
    },
    Illustration: {
      type: Sequelize.STRING
    },
    MainText: {
      type: Sequelize.TEXT
    },
    PromotionalBoost: {
      type: Sequelize.INTEGER
    }
  });

  const UserTopicScores = sequelize.define("userTopicScores", {
    TopicRating: {
      type: Sequelize.INTEGER
    }
  });

  const LikesDislikes = sequelize.define("likesDislikes", {
    LikeDislike: {
      type: Sequelize.INTEGER
    }
  });

  const CategoryPair = sequelize.define("CategoryPair", {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  // Define associations between entities
  User.belongsToMany(Topic, { through: UserTopicScores });
  Topic.belongsToMany(User, { through: UserTopicScores });

  User.belongsToMany(NewsItem, { through: LikesDislikes });
  NewsItem.belongsToMany(User, { through: LikesDislikes });

  NewsItem.belongsToMany(Topic, { through: CategoryPair});
  Topic.belongsToMany(NewsItem, { through: CategoryPair});

  return {
    Tutorial,
    User,
    Topic,
    NewsItem,
    UserTopicScores,
    LikesDislikes,
    CategoryPair
  };
};
