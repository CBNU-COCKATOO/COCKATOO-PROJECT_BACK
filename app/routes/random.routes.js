const { Router } = require("express");

module.exports=app=>{
    const random=require("../controller/random.controller.js");

    app.get("/random", random.getrandom);

}