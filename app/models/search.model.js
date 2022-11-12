const sql = require("./db.js");

exports.findByNAME = (name, result) => {
    var sql1 = 'SELECT u_id, u_name, u_image, u_mainst, u_height, u_weight FROM USER WHERE u_name = ?;';
    var sql1s = sql.format(sql1, name);

    var sql2 = 'SELECT clo_id, clo_name, clo_image, clo_style, clo_size FROM clothes WHERE clo_name = ?;';
    var sql2s = sql.format(sql2, name);

    var sql3 = 'SELECT cody_id, cody_name, cody_style, cody_image FROM cody WHERE cody_name = ?;';
    var sql3s = sql.format(sql3, name);

    sql.query(sql1s + sql2s + sql3s, (err, res) => {
        //var user_result = results[0];	//sql1 의 결과값
        //var clo_result = results[1];	//sql2 의 결과값
        //var codi_result = results[2];	//sql2 의 결과값
        
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("검색 입력:", name);
            console.log("found result: ", res);
            result(null, res);
            return;
        }

        // ����� ���� �� 
        result({ kind: "not_found" }, null);
    });
};

//module.exports = User;