const { Router } = require("express");

module.exports=app=>{
    const clothes=require("../controller/cloth.controller.js");
    //튜플 생성
    const multer = require('multer');
    const upload = multer({dest: './upload'})

    app.post("/clothes", upload.single('clo_image'), clothes.create);

    // 전체 조회 
    app.get("/clothes", clothes.findAll);

    // id로 조회
    app.get("/clothes/:clothId", clothes.findOne);

    // id로 수정
    app.put("/clothes/:clothId", clothes.update);

    // id로 삭제
    app.delete("/clothes/:clothId", clothes.delete);

    // 전체 삭제
    app.delete("/clothes", clothes.deleteAll);

}