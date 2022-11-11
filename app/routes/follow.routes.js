module.exports = app => {
    const follow = require("../controller/follow.controller.js");
    
    app.get("/follow", follow.follow);
    app.get("/unfollow", follow.unfollow);

};
