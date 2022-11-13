const sql = require("./db.js");

exports.findByNAME = (name, result) => {
    var sql1 = 'SELECT u_id, u_name, u_image, u_mainst, u_height, u_weight FROM USER WHERE u_name LIKE ?;';
    var sql1s = sql.format(sql1, '%'+name+'%');

    var sql2 = 'WITH clo_info AS(SELECT clo.clo_id, clo.clo_name, clo.clo_image, clo.clo_style, clo.clo_size, clo.u_id FROM clothes clo WHERE clo_name LIKE ?) SELECT u.u_id, c.clo_name, c.clo_image, c.clo_style, c.clo_size FROM clo_info c, USER u WHERE u.u_id = c.u_id;';
    var sql2s = sql.format(sql2, '%'+name+'%');

    var sql3 = 'WITH cody_info AS (SELECT cd.cody_id, cd.cody_name, cd.cody_image, cd.cody_style, cd.u_id FROM cody cd WHERE cody_name LIKE ?) SELECT u.u_id, d.cody_name, d.cody_image FROM cody_info d, USER u WHERE u.u_id = d.u_id;';
    var sql3s = sql.format(sql3, '%'+name+'%');

    sql.query(sql1s + sql3s + sql2s, (err, res) => {
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