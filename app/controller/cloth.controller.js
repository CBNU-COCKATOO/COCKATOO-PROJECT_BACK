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
        clo_des: req.body.clo_des,
        clo_type: req.body.clo_type,
        clo_u_id: req.body.clo_u_id
    });

    // 데이터베이스에 저장
    Cloth.create(cloth, (err, data) =>{
        if(err)
            res.status(500).send({
                message:
                err.message || "Some error occured while creating th Cloth."
            });
        else res.send(data);
    }) 
};
// 전체 조회 
exports.findAll = (req,res)=>{
    Cloth.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving clothes."
          });
        else res.send(data);
      });
};

// user id로 조회 -> 사용자 전체 옷 조회
exports.findOne = (req,res)=>{
  Cloth.findByID(
    req.params.userId,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cloth with clo_u_id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Cloth with clo_u_id " + req.params.userId
          });
        }
      } else res.send(data);
    });
};

exports.outerfind = (req, res) => {
  Cloth.findOuter(req.params.userId, (err,data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cloth with clo_u_id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Cloth with clo_u_id " + req.params.userId
        });
      }
    } else res.send(data);
  });  
};

exports.topfind = (req, res) => {
  Cloth.findTop(req.params.userId, (err,data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cloth with clo_u_id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Cloth with clo_u_id " + req.params.userId
        });
      }
    } else res.send(data);
  });  
};

exports.bottomfind = (req, res) => {
  Cloth.findBottom(req.params.userId, (err,data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cloth with clo_u_id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Cloth with clo_u_id " + req.params.userId
        });
      }
    } else res.send(data);
  });  
};

exports.shoesfind = (req, res) => {
  Cloth.findShoes(req.params.userId, (err,data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cloth with clo_u_id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Cloth with clo_u_id " + req.params.userId
        });
      }
    } else res.send(data);
  });  
};

// id로 갱신
exports.update = (req,res)=>{
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Cloth.updateByID(
    req.params.clothId,
    new Cloth(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cloth with clo_id ${req.params.clothId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Cloth with clo_id " + req.params.clothId
          });
        }
      } else res.send(data);
    }
  );
};

// id로 삭제
exports.delete = (req,res)=>{
    Cloth.remove(req.params.clothId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Cloth with clo_id ${req.params.clothId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Cloth with clo_id " + req.params.clothId
            });
          }
        } else res.send({ message: `Cloth was deleted successfully!` });
      });
};

// 전체 삭제
exports.deleteAll = (req,res)=>{
    Cloth.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all clothes."
          });
        else res.send({ message: `All Clothes were deleted successfully!` });
      });
};
