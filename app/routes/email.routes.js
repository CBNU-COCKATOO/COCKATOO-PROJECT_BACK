module.exports = app => {
    const email = require("../controller/email.controller.js");
    app.post("/emailauth", email.EmailSend, email.EmailCheck);

};