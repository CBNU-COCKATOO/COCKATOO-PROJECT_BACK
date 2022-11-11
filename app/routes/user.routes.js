module.exports = app => {
    const user = require("../controller/user.controller.js");

    // Ʃ�� ����
    app.post("/user", user.create);
    //아이디 중복 확인
    app.get("/idcheck/:userId",user.checkid);
    app.get("/pwcheck/:userId", user.checkpw);
    // ��ü ��ȸ 
    app.get("/user", user.findAll);

    // id�� ��ȸ
    app.get("/user/:userId", user.findOne);
    //아이디로 자기 마이페이지 설정 가져오기
    app.get("/mypage/:userId", user.Mypage);

    // id�� ����
    app.put("/user/:userId", user.update);
    app.post("/user/pwchange/:userId", user.PWupdate);
    app.put("/user/stchange/:userId", user.stUpdate);
    // id�� ����
    app.delete("/user/:userId", user.delete);

    // ��ü ����
    app.delete("/userall", user.deleteAll);

};