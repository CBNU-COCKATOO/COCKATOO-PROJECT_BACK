const sql = require("../models/db.js");

exports.findByID = (req, res) =>{
    const u_id = req.params.userId;

    const sql1 = 'SELECT * FROM USER WHERE u_id = ?;'; //사용자 정보
    const sql1s = sql.format(sql1, u_id);
    const sql2 = 'SELECT * FROM codi WHERE u_id = ?;'; //코디 정보
    const sql2s = sql.format(sql2, u_id);
    const sql3 = 'SELECT * FROM clothes WHERE u_id = ? AND clo_type = "outer";'; // 아우터 목록
    const sql3s = sql.format(sql3, u_id);
    const sql4 = 'SELECT * FROM clothes WHERE u_id = ? AND clo_type = "top";'; // 상의 목록
    const sql4s = sql.format(sql4, u_id);
    const sql5 = 'SELECT * FROM clothes WHERE u_id = ? AND clo_type = "bottom";'; // 하의 목록
    const sql5s = sql.format(sql5, u_id);
    const sql6 = 'SELECT * FROM clothes WHERE u_id = ? AND clo_type = "shoes";'; // 신발 목록
    const sql6s = sql.format(sql6, u_id);

    sql.query(sql1s+sql2s+sql3s+sql4s+sql5s+sql6s, (err, result)=>{
        if(err){
            console.log(err);
        }

        if(res.length){
            const User = results[0];
            const Codi = results[1];
            const Outer = results[2];
            const Top= results[3];
            const Bottom= results[4];
            const Shoes= results[5];
            console.log(result);
            res.send({
                data : {User, Codi, Outer, Top, Bottom, Shoes}});
        }

    });

};
