const sql = require("./db.js");


// ������ 
const User = function (user) {
    this.u_id = user.u_id;
    this.u_pw = user.u_pw;
    this.u_name = user.u_name;
    this.u_image = user.u_image;
    this.u_age = user.u_age;
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
            result(null, {message: "이미 있는 사용자입니다."});
            return;
        }

        // ����� ���� �� 
        result({ kind: "not_found" }, null);
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
User.updateByID = (id, customer, result) => {
    sql.query('UPDATE USER SET u_pw =?, u_name =?, u_image=?, u_age =?, u_email = ?, u_agree=?, u_height = ?, u_weight = ?, u_style=?, WHERE id = ? ',
    //사이트 확인해서 변수명, 개수 수정하기 
        [user.password, user.username, user.image, user.age, user.phonenumber, user.email, user.height, user.weight, user.id], (err, res) => {
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

            console.log("update customer: ", { id: id, ...customer });
            result(null, { id: id, ...customer });
        });
};

// user id�� ����
User.remove = (id, result) => {
    sql.query('DELETE FROM USER WHERE u_id = ?', id, (err, res) => {
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

        console.log("deleted customer with u_id: ", id);
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