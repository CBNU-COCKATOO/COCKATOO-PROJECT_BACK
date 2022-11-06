const sql = require("./db.js");

// 생성자 
const Cloth = function(cloth){
    this.clo_name = cloth.clo_name;
    this.clo_maker = cloth.clo_maker;
    this.clo_size = cloth.clo_size;
    this.clo_style=cloth.clo_style;
    this.clo_image=cloth.clo_image;
    this.clo_des=cloth.clo_des;
};

// customer 튜플 추가 
Cloth.create = (newCloth, result)=>{
    sql.query("INSERT INTO clothes SET ?", newCloth, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created cloth: ",{id:res.inseertId, ...newCloth });
        result(null, {id: res.inseertId, ...newCloth});
    });
};

// cloth id로 조회
Cloth.findByID = (clothId, result)=>{
    sql.query('SELECT * FROM clothes WHERE clo_id = ?',clothId, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log("found cloth: ", res[0]);
            result(null, res[0]);
            return;
        }

        // 결과가 없을 시 
        result({kind: "not_found"}, null);
    });
};

// cloth 전체 조회
Cloth.getAll = result =>{
    sql.query('SELECT * FROM clothes', (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("cloth: ", res);
        result(null, res);
    });
};

// cloth id로 수정
Cloth.updateByID = (clo_id, cloth, result)=>{
    sql.query('UPDATE clothes SET clo_name = ?, clo_maker = ?, clo_size = ?, clo_style =?, clo_des = ? WHERE clo_id = ?', 
    [cloth.clo_name, cloth.clo_maker, cloth.clo_size, cloth.clo_style, cloth.clo_des, clo_id], (err, res)=>{
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

        console.log("update cloth: ", {clo_id:clo_id, ... cloth});
        result(null, {clo_id:clo_id, ...cloth});
    });
};

// cloth id로 삭제
Cloth.remove = (clo_id, result)=>{
    sql.query('DELETE FROM clothes WHERE clo_id = ?',clo_id, (err, res)=>{
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

        console.log("deleted cloth with id: ", clo_id);
        result(null, res);
    });
};

// customer 전체 삭제
Cloth.removeAll = result =>{
    sql.query('DELETE FROM clothes',(err, res)=>{
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

        console.log('deleted ${res.affectedRows} clothes');
        result(null, res);
    });
};

module.exports=Cloth;