const { Router } = require("express");

module.exports=app=>{
    const cody = require("../controller/cody.controller.js");

    app.post("/cody", cody.create);

    //전체 조회
    app.get("/cody", cody.findAll);

    //user id로 전체 코디 조회
    app.get("/cody/:userId", cody.findOne);

    // id로 수정
    app.put("/cody/:codyId", cody.update);
    
    // id로 삭제
    app.delete("/cody/:codyId", cody.delete);
    
    // 전체 삭제
    app.delete("/cody", cody.deleteAll);
    

}