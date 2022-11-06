const sql = require("./db.js");

// 생성자 
const Cloth = function(cloth){
    this.clo_name = cloth.clo_name;
    this.clo_maker = cloth.clo_maker;
    this.clo_size = cloth.clo_size;
    this.clo_style=cloth.clo_style;
    this.clo_image=cloth.clo_image;
    this.clo_des=cloth.clo_des;
};

// customer 튜플 추가 
Cloth.create = (newCloth, result)=>{
    sql.query("INSERT INTO clothes SET ?", newCloth, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created cloth: ",{id:res.inseertId, ...newCloth });
        result(null, {id: res.inseertId, ...newCloth});
    });
};

module.exports=Cloth;