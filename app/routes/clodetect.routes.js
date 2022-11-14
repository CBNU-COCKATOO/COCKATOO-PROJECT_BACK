const { Router } = require("express");

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_KEYID,
    secretAccessKey: process.env.S3_PRIVATE_KEY,
    region: 'ap-northeast-2',
})

const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const upload = multer({
    storage: multerS3({
        s3:s3,
        bucket:'peacock-image',
        destination(req,file,cb){
            cb(null, 'upload/');
        },
        filename(req,file,cb){
            const ext = path.extname(file.originalname);
            cb(null, 'file_'+Date.now()+ext);
        }
    }),
    limits: {fileSize: 5*1024*1024},
});
const spawn = require('child_process').spawn

module.exports=app=>{
    
    app.post('/clodetect', upload.single('image'),async(req,res)=>{
        //spawn으로 파이썬 스크립트 실행
        //실행할 파일(app.py)와  매개변수로 저장된 파일명을 전달
        const net = spawn('python',['detect.py','best.pt',req.file.filename]);
        
        //파이썬 파일 수행 결과를 받아온다
        net.stdout.on('data', function(data) { 
            console.log(data);
            console.log(data.toString());
            if(data.toString() == 'nsfw')
                res.status(200).send('nsfw')
            else
                res.status(200).send('sfw')
        })
    })
}