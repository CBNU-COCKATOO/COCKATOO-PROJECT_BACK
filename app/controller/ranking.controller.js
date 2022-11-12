const sql = require("../models/db.js");

exports.getranking = (req, res) =>{
  sql.query('SELECT u.u_id, u.u_name, u.u_height, u.u_weight, u.u_follower, u.u_image, u.u_mainst, c.cody_image FROM USER as u LEFT OUTER JOIN cody as c on u.u_id = c.u_id ORDER BY u.u_follower DESC;', (err, data)=>{
    if(err){
        if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found UserRandom.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving UserRandom "
            });
          }
        } else res.send(data);

});
};
