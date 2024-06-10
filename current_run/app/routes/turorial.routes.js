module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const topics = require("../controllers/topic.controller.js");
  const newsitems = require("../controllers/newsItem.controller.js");
  const likesdislikess = require("../controllers/likesDislikes.controller.js");
  const userTopicScoress= require("../controllers/userTopicScores.controller.js");
  const CategoryPairs= require("../controllers/CategoryPair.controller.js");

  var router = require("express").Router();


  // Validate 
  router.get("/needID/", users.needID);
    // Validate or create a new User
    router.post("/auth/", users.validate);

    // // Validate JWT logically
    //  router.get("/validate/", users.validate);

  // Create a new User
  router.post("/user/", users.create);

  // Retrieve all Users
  router.get("/user/", users.findAll);

  // Retrieve a single User with id
  router.get("/user/:id", users.findOne);

  // Update a User with id
  router.put("/user/:id", users.update);

  // Delete a User with id
  router.delete("/user/:id", users.delete);

  // Delete all Users
  router.delete("/user/", users.deleteAll);

    // Create a new Topic
  router.post("/topic/", topics.create);

  // Retrieve all Topics
  router.get("/topic/", topics.findAll);

  // Retrieve a single Topic with id
  router.get("/topic/:id", topics.findOne);

  // Update a Topic with id
  router.put("/topic/:id", topics.update);

  // Delete a Topic with id
  router.delete("/topic/:id", topics.delete);

  // Delete all Topics
  router.delete("/topic/", topics.deleteAll);

  // Create a new News Item
  router.post("/newsitem/", newsitems.create);

  // Retrieve all News Item
  router.get("/newsitem/", newsitems.findAll);

  // Retrieve a single News Item with id
  router.get("/newsitem/:id", newsitems.findOne);

  // Update a News Item with id
  router.put("/newsitem/:id", newsitems.update);

  // Delete a News Item with id
  router.delete("/newsitem/:id", newsitems.delete);

  // Delete all News Item
  router.delete("/newsitem/", newsitems.deleteAll);

    // Create a new Like Dislike
    router.post("/likesdislikes/",likesdislikess.create);

    // Retrieve all Like Dislike
    router.get("/likesdislikes/", likesdislikess.findAll);
  
    // Retrieve a single Like Dislike with id
    router.get("/likesdislikes/:newsItemID/:userID", likesdislikess.findOne);
  
    // Update a Like Dislike with id
    router.put("/likesdislikes/:newsItemID/:userID", likesdislikess.update);
  
    // Delete a Like Dislike with id
    router.delete("/likesdislikes/:newsItemID/:userID", likesdislikess.delete);
  
    // Delete all Like Dislike
    router.delete("/likesdislikes/", likesdislikess.deleteAll);
  
    // Create a new User Topic Score
    router.post("/usertopicscores/",userTopicScoress.create);

    // Retrieve all User Topic Score
    router.get("/usertopicscores/", userTopicScoress.findAll);
  
    // Retrieve a single User Topic Score with id
    router.get("/usertopicscores/:newsItemID/:userID", userTopicScoress.findOne);
  
    // Update a User Topic Score with id
    router.put("/usertopicscores/:newsItemID/:userID", userTopicScoress.update);
  
    // Delete a User Topic Score with id
    router.delete("/usertopicscores/:newsItemID/:userID", userTopicScoress.delete);
  
    // Delete all User Topic Score
    router.delete("/usertopicscores/", userTopicScoress.deleteAll);

        // Create a new Category Pair
        router.post("/categorypair/", CategoryPairs.create);

        // Retrieve all Category Pair
        router.get("/categorypair/", CategoryPairs.findAll);
      
        // Retrieve a single Category Pair with id
        router.get("/categorypair/:newsItemID/:topicID", CategoryPairs.findOne);
      
        // Update a Category Pair with id
        router.put("/categorypair/:newsItemID/:topicID", CategoryPairs.update);
      
        // Delete a Category Pair with id
        router.delete("/categorypair/:newsItemID/:topicID", CategoryPairs.delete);
      
        // Delete all Category Pair
        router.delete("/categorypair/", CategoryPairs.deleteAll);
      
  

  app.use("/api/agnews", router);
};
