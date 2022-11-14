module.exports = app => {
    const dict = require("../controller/dictionary.controller.js");
    app.get("/dictionaryimage/:userId", dict.clo_cody);
    app.post("/dictionary/:userId", dict.CreateIndex);
    app.get("/dictionary/:userId", dict.GetDict);
};