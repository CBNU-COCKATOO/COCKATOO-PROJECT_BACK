module.exports = app => {
    const {login} = require("../controller/login.controller.js");
    const {logout} = require("../controller/login.controller.js");
    
    app.get("/login/:userId/:userPw", login);

    app.get("/login/:usesrId", logout);

};
