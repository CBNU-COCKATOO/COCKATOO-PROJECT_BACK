/*
const sql = require("./db.js");

exports.loginPostMid = (req, res) => {
    const { id, pw } = req.body;
    db.query(`SELECT * FROM user WHERE id="${id}"`, (error, result) => {
      if (error) return console.log(error);
  
      if (result.length) {
        console.log(result);
        if (result[0].pw === pw) {
          console.log('login 성공');
        } else {
          console.log('login 실패');
        }
        res.redirect('/');
      } else {
        console.log('login 실패');
        res.redirect('/');
      }
    });
  };
  */