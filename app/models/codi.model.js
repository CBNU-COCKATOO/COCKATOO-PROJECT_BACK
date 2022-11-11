const sql = require("./db.js");

//생성자
const Codi = function(codi){
    this.codi_name = codi.codi_name;
    this.codi_style = codi.codi_style;
    this.codi_image = codi.codi_image;
    this.codi_des = codi.codi_des;
    this.u_id = codi.u_id;
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
    sql.query('SELECT * FROM codi WHERE u_id = ?', userId, (err, res)=>{
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

// codi id로 수정
Codi.updateByID = (codi_id, codi, result)=>{
    sql.query('UPDATE codi SET codi_name = ?, codi_style = ?, codi_des=? WHERE codi_id = ?', 
    [codi.codi_name, codi.codi_style, codi.codi_des, codi_id], (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows ==0){
            // id 결과가 없을 시 
            result({kind: "not_found"}, null);
            return;
        }

        console.log("update codi: ", {codi_id:codi_id, ... codi});
        result(null, {codi_id:codi_id, ... codi});
    });
};

// codi id로 삭제
Codi.remove = (codi_id, result)=>{
    sql.query('DELETE FROM codi WHERE codi_id = ?',codi_id, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows ==0){
            // id 결과가 없을 시 
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted codi with id: ", codi_id);
        result(null, res);
    });
};

// codi 전체 삭제
Codi.removeAll = result =>{
    sql.query('DELETE FROM codi',(err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows ==0){
            // id 결과가 없을 시 
            result({kind: "not_found"}, null);
            return;
        }

        console.log('deleted ${res.affectedRows} codi');
        result(null, res);
    });
};

module.exports=Codi;