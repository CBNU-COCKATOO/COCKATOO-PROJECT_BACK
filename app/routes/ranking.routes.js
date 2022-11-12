const { Router } = require("express");

module.exports=app=>{
    const ranking=require("../controller/ranking.controller.js");

    app.get("/ranking", ranking.getranking);

}