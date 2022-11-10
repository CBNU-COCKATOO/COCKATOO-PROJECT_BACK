const { Router } = require("express");

module.exports=app=>{
    const closet=require("../controller/closet.controller.js");

    app.get("/findcloset/:userId", closet.findByID);

    //튜플 생성
}