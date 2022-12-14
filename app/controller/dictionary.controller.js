const Dict = require("../models/dictionary.model.js");

exports.clo_cody = (req, res) => {
  if (!req.body) {
    res.status(400).json({
        message: "Content can not be empty!"
    });
  }else{
    Dict.findByID(req.params.userId, (err,data)=>{
      if(err.kind=="not_found"){
          res.json({
              message: "가지고 있는 옷이나 코디가 없습니다."
          })
      }else res.json(data);
    })
  };
};

exports.CreateIndex = (req, res) =>{
  if (!req.body) {
    res.status(400).json({
        message: "Content can not be empty!"
    });
  }else{
    console.log("컨트롤 쪽 받기 req.body.d_index: "+req.body.d_index);
    console.log("req.body.d_image:"+req.body.d_image);
    const dict = new Dict({
      d_index : req.body.d_index,
      d_image : req.body.d_image
      });
      
    
      Dict.create(req.params.userId, dict, (err,data)=>{
        if (err) {
          res.status(500).json({
              message:
                  err.message || "Some error occured while creating Dictionary Index."
          });
        }else res.status(200).json({
          message:"성공적으로 Index 정보를 저장했습니다."
        });
      })
  };    
};

exports.GetDict = (req, res) => {
  Dict.getAll(req.params.userId, (err,data)=>{
    if(err.kind=="not_found"){
        res.json(data);
    }else res.json(data);
  })

};

exports.Delete=(req,res)=>{
  Dict.DeleteById(req.params.userId, req.params.indexId,(err,data)=>{
    if(err.kind=="not_found"){
      res.json({
        message:
            err.message || "Some error occured while delete Dictionary Index."
    });
  }else res.json({
    message: "성공적으로 인덱스 삭제됐습니다."
  });
  })
};