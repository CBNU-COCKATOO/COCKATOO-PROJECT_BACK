const sql = require("./db.js");
//const { uuid } = require('uuidv4');
const { v4: uuidv4 } = require('uuid')

// ������ 
const Dict = function (dict) {
    this.d_index = dict.d_index;
    this.d_image = dict.d_image;
};
//user id로 index에 사진 추가한 현황 저장
Dict.create = (userId, dict, result) => {
    const d_num = uuidv4();
    sql.query('INSERT INTO DICTIONARY VALUES(?, ?, ?, ?, default)', [d_num, dict.d_index, dict.d_image, userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else console.log("Created dict_index: ", dict.d_index);
    });
    result(null, {kind:"created"});

};

// user id로 옷&코디 이미지 불러오기
Dict.findByID = (userId, result) => {
    const sql1 = 'SELECT cody_image d_image from cody c WHERE c.u_id = ?;'; //사용자 정보
    const sql1s = sql.format(sql1, userId);
    const sql2 = 'SELECT clo_image d_image from clothes clo WHERE clo.u_id = ?;'; //사용자 정보
    const sql2s = sql.format(sql2, userId);
    
    sql.query(sql1s+sql2s, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else{
            if (res.length) {
                let c_image = Object.assign(res[0],res[1]);
                console.log("검색 아이디:", userId);
                console.log("found customer: ", res[0]);
                result({kind:"found"}, c_image);
                return;
            }else{
                result({ kind: "not_found" }, null);
            }
        }
    });
};

Dict.getAll = (userId, result) => {
    sql.query('SELECT d_index, d_image FROM DICTIONARY WHERE u_id = ?', userId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else{
            if(!res.length){
                result({ kind: "not_found" }, res);
            }else{
                console.log("indexes: ", res);
                result({kind:"found"}, res);
            };
        };
    });
};

module.exports = Dict;