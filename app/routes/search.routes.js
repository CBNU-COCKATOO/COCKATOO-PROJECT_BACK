module.exports = app => {
    const search = require("../controller/search.controller.js");
    // app.get("/search/:username",search.SearchUser);
    // app.get("/search/:cloname", search.SearchClo);
    // app.get("/search/:codiname,", search.SearchCodi);
    app.post("/search", search.SearchAll);
};