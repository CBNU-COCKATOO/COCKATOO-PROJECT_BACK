//const { request } = require("express");
const sql = require("../models/db.js");

exports.login = (req, res) => {
    const u_id = req.params.userId;
    const u_pw = req.params.userPw;

    sql.query('SELECT * FROM USER WHERE u_id = ? AND u_pw =?', [u_id, u_pw],(error, result) => {
      if (error) return console.log(error);
  
      if (result.length) {
        console.log(result);
        //session에 로그인 했음 저장
        //request.session.loggedin =true;
        //request.session.username = u_id;
        res.json({message:"로그인 성공"});
        //res.redirect('/');
        //res.end();

      } else {
        console.log({message:"로그인 실패"});
        res.json({message:"로그인 실패"});
        //res.redirect('/');
        //res.end();
      }
    });
};

exports.logout = (req, res) => {
    //request.session.loggedin =false;
    res.json({"Logout":"Successfully Log out"});
};