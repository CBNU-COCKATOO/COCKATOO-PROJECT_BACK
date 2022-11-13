const sql = require("../models/db.js");
const User = require("../models/user.model.js");

exports.findByID = (req, res) =>{
    const u_id = req.params.userId;

    const sql1 = 'SELECT * FROM USER WHERE u_id = ?;'; //사용자 정보
    const sql1s = sql.format(sql1, u_id);
    const sql2 = 'SELECT * FROM cody WHERE u_id = ?;'; //코디 정보
    const sql2s = sql.format(sql2, u_id);
    const sql3 = 'SELECT * FROM clothes WHERE u_id = ? AND clo_type = "outer";'; // 아우터 목록
    const sql3s = sql.format(sql3, u_id);
    const sql4 = 'SELECT * FROM clothes WHERE u_id = ? AND clo_type = "top";'; // 상의 목록
    const sql4s = sql.format(sql4, u_id);
    const sql5 = 'SELECT * FROM clothes WHERE u_id = ? AND clo_type = "bottom";'; // 하의 목록
    const sql5s = sql.format(sql5, u_id);
    const sql6 = 'SELECT * FROM clothes WHERE u_id = ? AND clo_type = "shoes";'; // 신발 목록
    const sql6s = sql.format(sql6, u_id);

    User.IDCheck(u_id, (err,data)=>{
      if(err){
        if (err.kind == "not_found") {
            res.status(404).json({
              message: "해당 사용자가 없습니다."
            });
          } 
        //   else {
        //     res.status(500).send({
        //       message: "Error retrieving Closet with u_id " + req.params.userId
        //     });
        //   }
        // }
        else {
          sql.query(sql1s+sql2s+sql3s+sql4s+sql5s+sql6s, (err, data)=>{
            if(err){
                if (err.kind == "not_found") {
                    res.status(404).json({
                      message: `Not found Closet with u_id ${req.params.userId}.`
                    });
                  } else {
                    res.status(500).json({
                      message: "Error retrieving Closet with u_id " + req.params.userId
                    });
                  }
                }else res.status(200).json(data);
              });
        };
    }
  });

};
