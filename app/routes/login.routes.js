module.exports = app => {
    const {login} = require("../controller/login.controller.js");
    const {logout} = require("../controller/login.controller.js");
    
    const {dict} = require("../controller/dictionary.js");
    app.get("/login/:userId/:userPw", login);

    app.get("/login/:usesrId", logout);
    app.get("/check",dict);

};
