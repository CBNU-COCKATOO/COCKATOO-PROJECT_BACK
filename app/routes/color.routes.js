module.exports = app =>{
    const color = require("../controller/color.controller.js");
    app.get("/analyzecolor/:userId", color.anlycolor);
}