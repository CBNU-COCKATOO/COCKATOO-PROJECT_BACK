const sql = require("../models/db.js");

exports.detect = (req,res)=>{
    const clo_image = req.file.file_name;
    const spawn = require('child_process').spawn;
    const result = spawn('python', ['detect.py', clo_image]);
    
    result.stdout.on('data', function(data) {
        console.log(data.toString());
    });
    
    result.stderr.on('data', function(data) {
        console.log(data.toString());
    });
};