const { Router } = require("express");

module.exports=app=>{
    
    app.post("/clodetect", clodetect.detect);
}