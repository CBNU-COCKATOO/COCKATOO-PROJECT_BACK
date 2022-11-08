const { Router } = require("express");

module.exports=app=>{
    const codi = require("../controller/codi.controller.js");

    const multer = require('multer');
    const upload = multer({dest: './codiupload'})

    app.post("/codi", upload.single('codi_image'), codi.create);

    //전체 조회
    app.get("/codi", codi.findAll);

    //user id로 전체 코디 조회
    app.get("/codi/:userId", codi.findOne);

}