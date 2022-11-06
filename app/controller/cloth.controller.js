const Cloth = require("../models/cloth.model.js");

// 새 객체 생성
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const cloth = new Cloth({
        clo_name: req.body.clo_name,
        clo_maker: req.body.clo_maker,
        clo_size: req.body.clo_size,
        clo_style: req.body.clo_style,
        clo_image: '/image/'+req.file.filename,
        clo_des: req.body.clo_des
    });

    // 데이터베이스에 저장
    Cloth.create(cloth, (err, data) =>{
        if(err){
            res.status(500).send({
                message:
                err.message || "Some error occured while creating th Cloth."
            });
        };
    }) 
};

