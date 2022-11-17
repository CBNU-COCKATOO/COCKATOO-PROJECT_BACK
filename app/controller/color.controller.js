//const { request } = require("express");
const sql = require("../models/db.js");

exports.anlycolor = (req, res) => {
    const u_id = req.params.userId;

    sql.query('SELECT clo_color FROM clothes WHERE u_id =?;', u_id,(error, result) => {
      if (error) return console.log(error);
      else{
        if (result.length) {
            console.log(result);
            //session에 로그인 했음 저장
            //request.session.loggedin =true;
            //request.session.username = u_id;
            res.json(result);
            return;
          } else {
            console.log({message:"데이터가 없습니다."});
            res.json({message:"데이터가 없습니다."});
            return;
          }
      }
    });
};