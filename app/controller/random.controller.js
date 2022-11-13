const sql = require("../models/db.js");

exports.getrandom = (req, res) =>{;
    sql.query('SELECT u.u_id, u.u_name, u.u_height, u.u_weight, u.u_follower, u.u_image, u.u_mainst, c.cody_image FROM USER as u LEFT OUTER JOIN cody as c on u.u_id = c.u_id ORDER BY rand(u.u_id);', (err, data)=>{
        console.log(data);
        console.log()
});

};
