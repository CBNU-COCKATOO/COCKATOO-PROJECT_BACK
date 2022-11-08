const User = require("../models/user.model.js");

// �� ��ü ����
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const user = new User({
        u_id: req.body.u_id,
        u_pw: req.body.u_pw,
        u_name: req.body.u_name,
        u_image: req.body.u_image,
        u_age: req.body.u_age,
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
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating th User."
            });
        } //   ;
        else
        res.status(200).json({message:"Successfully Created."});

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
                    message: "Error retrieving User with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};

// ��ü ��ȸ 
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user."
            });
        else res.send(data);
    });
};

// id�� ��ȸ
//userId의 user는 위의 객체 이름이고 Id는 그냥 id를 가져오는 건가봄
exports.findOne = (req, res) => {

    User.findByID(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({  
                    message: 'Not found user with id '+ req.params.userId
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};

// id�� ����
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    User.updateById(
        req.params.usesrId,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.usesrId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating User with id " + req.params.usesrId
                    });
                }
            } else res.send(data);
        }
    );
};

// id�� ����
exports.delete = (req, res) => {
    User.remove(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with id " + req.params.userId
                });
            }
        } else res.send({ message: `User was deleted successfully!` });
    });
};

// ��ü ����
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all user."
            });
        else res.send({ message: `All User were deleted successfully!` });
    });
};