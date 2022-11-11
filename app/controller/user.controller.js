const User = require("../models/user.model.js");

// �� ��ü ����
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            message: "Content can not be empty!"
        });
    };

    const user = new User({
        u_id: req.body.u_id,
        u_pw: req.body.u_pw,
        u_name: req.body.u_name,
        u_image: req.body.u_image,
        u_email: req.body.u_email,
        u_height: req.body.u_height,
        u_weight: req.body.u_weight,
        u_mainst: req.body.u_mainst,
        u_subst: req.body.u_subst,
        u_emagree: req.body.u_emagree,
        u_follower: req.body.u_follwer,
        u_following: req.body.u_following
    });


    // �����ͺ��̽��� ����
    User.create(user, (err, data) => {
        //res.send('${id},${pw}');
        if (err) {
            res.status(500).json({
                message:
                    err.message || "Some error occured while creating th User."
            });
        } //   ;
        else
        res.status(200).json({message:"회원가입 성공"});

    })
};
//아이디 중복 확인
exports.checkid = (req, res) => {
    User.IDCheck(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(200).json({  
                    message: "사용할 수 있는 아이디입니다."//+ req.params.userId
                });
            } else {
                res.status(500).json({
                    message: "사용할 수 없는 아이디입니다: " + req.params.userId
                });
            }
        } else res.status(500).json({message:"사용할 수 없는 아이디입니다.:"+req.params.userId});
    });
};

exports.checkpw = (req, res) => {
    User.PWCheck(req.params.userId, req.body.u_pw, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(200).json({  
                    message: "비밀번호 인증에 실패했습니다."//+ req.params.userId
                });
            } else {
                res.status(500).json({
                    message: "비밀번호 인증에 성공했습니다. 아이디:" + req.params.userId
                });
            }
        } else res.status(500).json({message:"비밀번호 인증에 성공했습니다."});
    });
};

// ��ü ��ȸ 
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving user."
            });
        else res.json(data);
    });
};

// 이름으로 검색
//userId는 uri 변수 이름
exports.findOne = (req, res) => {
    User.findByID(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).json({  
                    message: 'Not found user with id '+ req.params.userId
                });
            } else {
                res.status(500).json({
                    message: "Error retrieving User with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};

exports.Mypage = (req, res)=>{
    User.findMypage(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).json({  
                    message: 'Not found user with id '+ req.params.userId
                });
            } else {
                res.status(500).json({
                    message: "Error retrieving User with id " + req.params.userId
                });
            }
        } else res.json(data);
    });
};

// id�� ����
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).json({
            message: "Content can not be empty!"
        });
    }

    User.updateByID(
        req.params.userId,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind == "not_found") {
                    res.status(404).json({
                        message: "다시 입력해주세요."
                    });
                } else {
                    res.status(500).json({
                        message: "Error updating User with id " + req.params.userId
                    });
                }
            } else{
                res.json({message:"수정 성공했습니다."});
                // res.send(data);
            }
            
        }
    );
};
exports.PWupdate =(req, res) => {
    User.pw_update(req.params.userId, req.body.u_pw, (err, data)=>{
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).json({
                    message: `Not found User with id ${req.params.userId}.`
                });
            } else {
                res.status(500).json({
                    message: "Could not delete User with id " + req.params.userId
                });
            }
        } else res.json({ message: `비밀번호 수정 성공했습니다.` });
    }) 
}

exports.stUpdate =(req, res) => {
    User.st_update(req.params.userId, new User(req.body),
     (err, data)=>{
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).json({
                    message: "다시 입력해주세요."
                });
            } else {
                res.status(500).json({
                    message: "Could not delete User with id " + req.params.userId
                });
            }
        } else res.json({ message: `체형/스타일 수정 성공했습니다.` });
    }) 
}


// id�� ����
exports.delete = (req, res) => {
    User.remove(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).json({
                    message: `Not found User with id ${req.params.userId}.`
                });
            } else {
                res.status(500).json({
                    message: "Could not delete User with id " + req.params.userId
                });
            }
        } else res.json({ message: `삭제 성공했습니다.` });
    });
};

// ��ü ����
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
            res.status(500).json({
                message:
                    err.message || "Some error occurred while removing all user."
            });
        else res.json({ message: `All User were deleted successfully!` });
    });
};