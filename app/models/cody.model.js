const sql = require("./db.js");

//생성자
const Cody = function(cody){
    this.cody_name = cody.cody_name;
    this.cody_style = cody.cody_style;
    this.cody_image = cody.cody_image;
    this.cody_des = cody.cody_des;
    this.u_id = cody.u_id;
};

//cody 튜플 추가
Cody.create = (newCody, result)=>{
    sql.query("INSERT INTO cody SET ?", newCody, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created cody: ",{id:res.inseertId, ...newCody });
        result(null, {id: res.inseertId, ...newCody});
    });
};

//전체 조회
Cody.getAll = result =>{
    sql.query('SELECT * FROM cody', (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("cody: ", res);
        result(null, res);
    });
};

//user id로 코디 전체 조회
Cody.findByID = (userId, result)=>{
    sql.query('SELECT * FROM cody WHERE u_id = ?', userId, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return
        }

        if(res.length){
            console.log("found cody: ",res);
            result(null,res);
            return;
        }

        //결과가 없을시
        result({kind: "not_found"}, null);
    });
};

// codi id로 수정
Cody.updateByID = (cody_id, cody, result)=>{
    sql.query('UPDATE cody SET cody_name = ?, cody_style = ?, cody_image =?, cody_des=? WHERE cody_id = ?', 
    [cody.cody_name, cody.cody_style, cody.cody_image, cody.cody_des, cody_id], (err, res)=>{
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

        console.log("update cody: ", {cody_id:cody_id, ... cody});
        result(null, {cody_id:cody_id, ... cody});
    });
};

// cody id로 삭제
Cody.remove = (cody_id, result)=>{
    sql.query('DELETE FROM cody WHERE cody_id = ?',cody_id, (err, res)=>{
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

        console.log("deleted cody with id: ", cody_id);
        result(null, res);
    });
};

// cody 전체 삭제
Cody.removeAll = result =>{
    sql.query('DELETE FROM cody',(err, res)=>{
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

        console.log('deleted ${res.affectedRows} cody');
        result(null, res);
    });
};

module.exports=Cody;