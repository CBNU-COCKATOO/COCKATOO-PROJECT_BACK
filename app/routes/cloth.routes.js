const { Router } = require("express");

module.exports=app=>{
    const clothes=require("../controller/cloth.controller.js");
    //튜플 생성
    const multer = require('multer');
    const upload = multer({dest: './upload'})

    app.post("/clothes", upload.single('clo_image'), clothes.create);
}