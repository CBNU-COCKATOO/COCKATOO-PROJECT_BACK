const sql = require("./db.js");


// ������ 
const User = function (user) {
    this.u_id = user.u_id;
    this.u_pw = user.u_pw;
    this.u_name = user.u_name;
    this.u_image = user.u_image;
    this.u_email = user.u_email;
    this.u_height = user.u_height;
    this.u_weight = user.u_weight;
    this.u_mainst = user.u_mainst;
    this.u_subst = user.u_subst;
    this.u_emagree = user.u_emagree;
    //this.u_style = JSON.stringify(user.u_style);//req json으로 받기
    //this.u_agree = JSON.stringify(user.u_agree);//req json으로 받기
};

// user Ʃ�� �߰� 
User.create = (newUser, result) => {
    sql.query("INSERT INTO USER SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        //왜 inseertId로 되어있지?
        console.log("Created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};
//아이디 중복 확인

// "익명 함수가 되는 이유 찾기"
User.IDCheck = (userId, result) => {
    
    sql.query('SELECT * FROM USER WHERE u_id = ?', userId, (err, res) => {
        console.log("res: ", res);
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("검색 아이디:", userId);
            result({ kind: "found" }, res);
            return;
        }

        // ����� ���� �� 
        result({ kind: "not_found" }, null);
    });
};
User.PWCheck = (userId, userPw, result) => {
    sql.query('SELECT * FROM USER WHERE u_id = ? AND u_pw =?', [userId, userPw], (err, res) => {
        console.log("res: ", res);
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("검색 아이디:", userId);
            result(null, {message: "인증 성공"});
            return;
        }else result({ kind: "not_found" }, null);
    });
};

// user id�� ��ȸ
User.findByID = (userId, result) => {
    
    sql.query('SELECT * FROM USER WHERE u_id = ?', userId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("검색 아이디:", userId);
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // ����� ���� �� 
        result({ kind: "not_found" }, null);
    });
};

User.findMypage = (userId, result) => {
    
    sql.query('SELECT u_name, u_image, u_height, u_weight, u_mainst, u_follower FROM USER WHERE u_id = ?', userId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("검색 아이디:", userId);
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // ����� ���� �� 
        result({ kind: "not_found" }, null);
    });
};

// user ��ü ��ȸ
User.getAll = result => {
    sql.query('SELECT * FROM USER', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("user: ", res);
        result(null, res);
    });
};

// user id�� ����
User.updateByID = (userId, user, result) => {
    sql.query('UPDATE USER SET u_name =?, u_image=?, u_email = ? WHERE u_id = ? ',
    [user.u_name, user.u_image, user.u_email, userId], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                // id ����� ���� �� 
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("update user: ", { id: userId, ...user });
            result(null, { id: userId, ...user });
        });
};
User.pw_update = (userId, userPw, result) => {
    sql.query('UPDATE USER SET u_pw =? WHERE u_id = ? ',
    [userPw, userId], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                // id ����� ���� �� 
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("update user: ", { id: userId, userPw });
            result(null, { id: userId, userPw });
        });
};
User.st_update = (userId, user, result) => {
    sql.query('UPDATE USER SET u_height =?, u_weight = ?, u_mainst = ?, u_subst = ? WHERE u_id = ? ',
    [user.u_height, user.u_weight, user.u_mainst, user.u_subst, userId], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                // id ����� ���� �� 
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("update user: ", { id: userId, ...user });
            result(null, { id: userId, ...user });
        });
};

// user id�� ����
User.remove = (userId, result) => {
    sql.query('DELETE FROM USER WHERE u_id = ?', userId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // id ����� ���� �� 
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted customer with u_id: ", userId);
        result(null, res);
    });
};

// user ��ü ����
User.removeAll = result => {
    sql.query('DELETE FROM USER', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // id ����� ���� �� 
            result({ kind: "not_found" }, null);
            return;
        }

        console.log('deleted ${res.affectedRows} user');
        result(null, res);
    });
};

module.exports = User;