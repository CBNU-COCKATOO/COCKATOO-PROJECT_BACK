const { Router } = require("express");

module.exports=app=>{
    const clothes=require("../controller/cloth.controller.js");
    //튜플 생성
    const multer = require('multer');
    const upload = multer({dest: './upload'})

    app.post("/clothes", upload.single('clo_image'), clothes.create);

    //user id로 outer 값 조회
    app.get("/findouter/:userId",clothes.outerfind);

    //user id로 top 값 조회
    app.get("/findtop/:userId",clothes.topfind);

    //user id로 bottom 값 조회
    app.get("/findbottom/:userId",clothes.bottomfind);

    //user id로 shoes 값 조회
    app.get("/findshoes/:userId",clothes.shoesfind);

    // 전체 조회 
    app.get("/clothes", clothes.findAll);

    // user id로 옷 전체 조회
    app.get("/clothes/:userId", clothes.findOne);

    // id로 수정
    app.put("/clothes/:clothId", clothes.update);

    // id로 삭제
    app.delete("/clothes/:clothId", clothes.delete);

    // 전체 삭제
    app.delete("/clothes", clothes.deleteAll);

}