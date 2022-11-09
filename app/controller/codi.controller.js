const Codi = require("../models/codi.model.js");
const clothRoutes = require("../routes/cloth.routes.js");

//새 객체 생성
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const codi = new Codi({
        codi_name : req.body.codi_name,
        codi_style : req.body.codi_style,
        codi_image : '/image/'+req.file.filename,
        codi_des : req.body.codi_des,
        codi_u_id : req.body.codi_u_id
    });

    //데이터베이스에 저장
    Codi.create(codi, (err, data) =>{
        if(err)
            res.status(500).send({
                message:
                err.message || "some error occured while creating the Codi."
            });
            else res.send(data);
    });
};
//전체 조회
exports.findAll = (req,res)=>{
    Codi.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
                err.message || "some error occurred while retrieving codi."
        });
        else res.send(data);
    });
};
//사용자 아이디로 조회
exports.findOne = (req,res)=>{
    Codi.findByID(
        req.params.userId,
        (err,data) => {
            if(err) {
                if (err.kind == "not found") {
                    res.status(404).send({
                        message: 'Not found Codi with codi_u_id ${req.params.userId}.'
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving Codi with codi_u_id" + req.params.userId
                    });
                }
            } else res.send(data);
        });
};

// codi id로 갱신
exports.update = (req,res)=>{
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Codi.updateByID(
    req.params.codiId,
    new Codi(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Codi with codi_id ${req.params.codiId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Codi with codi_id " + req.params.codiId
          });
        }
      } else res.send(data);
    }
  );
};

// id로 삭제
exports.delete = (req,res)=>{
    Codi.remove(req.params.codiId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Codi with codi_id ${req.params.codiId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Codi with codi_id " + req.params.codiId
            });
          }
        } else res.send({ message: `Codi was deleted successfully!` });
      });
};

// 전체 삭제
exports.deleteAll = (req,res)=>{
    Codi.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all codies."
          });
        else res.send({ message: `All Codies were deleted successfully!` });
      });
};