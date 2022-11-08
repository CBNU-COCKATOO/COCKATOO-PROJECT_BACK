const sql = require("./db.js");

//생성자
const Codi = function(codi){
    this.codi_name = codi.codi_name;
    this.codi_style = codi.codi_style;
    this.codi_image = codi.codi_image;
    this.codi_des = codi.codi_des;
    this.codi_u_id = codi.codi_u_id;
};

//codi 튜플 추가
Codi.create = (newCodi, result)=>{
    sql.query("INSERT INTO codi SET ?", newCodi, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created codi: ",{id:res.inseertId, ...newCodi });
        result(null, {id: res.inseertId, ...newCodi});
    });
};

//전체 조회
Codi.getAll = result =>{
    sql.query('SELECT * FROM codi', (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("codi: ", res);
        result(null, res);
    });
};

//user id로 코디 전체 조회
Codi.findByID = (userId, result)=>{
    sql.query('SELECT * FROM codi WHERE codi_u_id = ?', userId, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return
        }

        if(res.length){
            console.log("found codi: ",res);
            result(null,res);
            return;
        }

        //결과가 없을시
        result({kind: "not_found"}, null);
    });
};

module.exports=Codi;