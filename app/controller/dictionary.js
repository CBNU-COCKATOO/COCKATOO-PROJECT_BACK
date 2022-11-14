const sql = require("../models/db.js");

exports.dict = (req, res) => {

    sql.query('SELECT d_color FROM Dictionary WHERE d_id=1',(error, result) => {
      if (error) return console.log(error);
  
      if (result.length) {
        console.log("성공");
        res.json(result);
      } else {
        console.log({message:"로그인 실패"});
        res.json({message:"로그인 실패"});
      }
    });
};