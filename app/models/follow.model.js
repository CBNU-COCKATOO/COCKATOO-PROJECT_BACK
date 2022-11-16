const sql = require("./db.js");
//UUID 생성 함수 라이브러리
const { uuid } = require('uuidv4');

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
        }else{
            if (!res.length) {
                result({ kind: "not_found" }, null);
            
            }else{
                result({ kind: "find" }, "이미 있는 팔로우입니다.");
             //result(null, res[0]);
                return;
            }; 
        }
    });
};

Follow.create = (follow, result) => {
    const f_num = uuid();
    sql.query('INSERT INTO FOLLOW VALUES(?, ?, ?, default)', [f_num, follow.follower_id, follow.followee_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else{
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
        }
        

    });
    result(null, {kind:"created"});

};

Follow.delete = (follow, result) => {
    sql.query('DELETE FROM FOLLOW WHERE follower_id =? AND followee_id = ?', [follow.follower_id, follow.followee_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else {
            console.log("deleted follow");
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
            result(null, res);
        }
    });
};

Follow.List = (follower_id, result) => {

    sql.query('WITH follow_info AS (SELECT u_id, u_image, u_name, followee_id, follower_id from FOLLOW, USER WHERE u_id = follower_id) SELECT u.u_id, u.u_name, u.u_image, f.followee_id, f.follower_id FROM follow_info f JOIN USER u ON ? = f.follower_id and f.followee_id = u.u_id;', 
    follower_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else{
            if (!res.length) {
                result({ kind: "not_found" }, null);
                
            }else{
                result({kind:"find"}, res);
                //result(null, res[0]);
                return;
            }  
        }
              
    });
};
module.exports = Follow;