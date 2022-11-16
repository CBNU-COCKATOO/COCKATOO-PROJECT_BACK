module.exports = app => {
    const email = require("../controller/email.controller.js");
    app.post("/emailauth", email.EmailSend);
    app.post("/emailauthcode", email.EmailCheck);
};