const sql = require("./db.js");
//UUID 생성 함수 라이브러리
const crypto = require('crypto');

const Follow = function(follow){
    this.follower_id = follow.follower_id;
    this.followee_id = follow.followee_id;
};

Follow.check = (follow, result) => {

    sql.query('SELECT * FROM FOLLOW WHERE follower_id =? AND  followee_id = ? ', 
    [follow.follower_id, follow.followee_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        };
        if (!res.length) {
            result({ kind: "not_found" }, null);
            
        }else{
            result({ kind: "find" }, "이미 있는 팔로우입니다.");
            //result(null, res[0]);
            return;
        }        
    });
};

Follow.create = (follow, result) => {
    const uuid = crypto.randomUUID();
    const f_num = uuid;
    sql.query('INSERT INTO FOLLOW VALUES(?, ?, ?, default)', [f_num, follow.follower_id, follow.followee_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Created follow: ", follow.follower_id);

        sql.query('UPDATE USER SET u_following = u_following + 1 WHERE u_id =? ', follow.follower_id, (err)=>{
            if(err){
                console.log("error: ", err);
                result(err, null);
                return;
            }else console.log(follow.follower_id + "의 팔로잉 수 증가 성공");
        });

        sql.query('UPDATE USER SET u_follower = u_follower + 1 WHERE u_id = ?', follow.followee_id, (err) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }else console.log(follow.followee_id + "의 팔로우 수 증가 성공");
        });

    });
    result(null, {kind:"created"});

};

Follow.delete = (follow, result) => {
    sql.query('DELETE FROM FOLLOW WHERE follower_id =? AND followee_id = ?', [follow.follower_id, follow.followee_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("deleted follow");
        result(null, res);
        sql.query('UPDATE USER SET u_following = u_following - 1 WHERE u_id =? ', follow.follower_id, (err)=>{
            if(err){
                console.log("error: ", err);
                result(err, null);
                return;
            }else console.log(follow.follower_id + "의 팔로잉 수 감소 성공");
        });

        sql.query('UPDATE USER SET u_follower = u_follower - 1 WHERE u_id = ?', follow.followee_id, (err) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }else console.log(follow.followee_id + "의 팔로우 수 감소 성공");
        });
    });
};
module.exports = Follow;