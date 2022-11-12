const Cody = require("../models/cody.model.js");

//새 객체 생성
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const cody = new Cody({
        cody_name : req.body.cody_name,
        cody_style : req.body.cody_style,
        cody_image : req.body.cody_image,
        cody_des : req.body.cody_des,
        u_id : req.body.u_id
    });

    //데이터베이스에 저장
    Cody.create(cody, (err, data) =>{
        if(err)
            res.status(500).send({
                message:
                err.message || "some error occured while creating the Cody."
            });
            else res.status(200).json({message:"Successfully Created."});
    });
};
//전체 조회
exports.findAll = (req,res)=>{
    Cody.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
                err.message || "some error occurred while retrieving cody."
        });
        else res.status(200).json(data);
    });
};
//사용자 아이디로 조회
exports.findOne = (req,res)=>{
    Cody.findByID(
        req.params.userId,
        (err,data) => {
            if(err) {
                if (err.kind == "not found") {
                    res.status(404).send({
                        message: 'Not found Cody with u_id ${req.params.userId}.'
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving Cody with u_id" + req.params.userId
                    });
                }
            } else res.status(200).json(data);
        });
};

// cody id로 갱신
exports.update = (req,res)=>{
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Cody.updateByID(
    req.params.codyId,
    new Cody(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cody with cody_id ${req.params.codyId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Cody with cody_id " + req.params.codyId
          });
        }
      } else res.status(200).json(data);
    }
  );
};

// id로 삭제
exports.delete = (req,res)=>{
    Cody.remove(req.params.codyId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Cody with cody_id ${req.params.codyId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Cody with cody_id " + req.params.codyId
            });
          }
        } else res.status(200).json({ message: `Cody was deleted successfully!` });
      });
};

// 전체 삭제
exports.deleteAll = (req,res)=>{
    Cody.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all codies."
          });
        else res.status(200).json({ message: `All Codies were deleted successfully!` });
      });
};