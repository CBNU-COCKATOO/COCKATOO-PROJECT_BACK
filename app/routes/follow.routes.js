module.exports = app => {
    const follow = require("../controller/follow.controller.js");
    
    app.post("/follow", follow.follow);
    app.post("/unfollow", follow.unfollow);
    app.get("/followuser/:userId", follow.follow_closet);

};