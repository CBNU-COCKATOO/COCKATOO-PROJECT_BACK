// const multer = require('multer');
// const AWS = require('aws-sdk');
// const multerS3 = require('multer-s3');
// require('dotenv').config();
// //보안키는 .env파일로 관리
// const s3 = new AWS.S3({
//     accessKeyId: process.env.S3_KEYID,
//     secretAccessKey: process.env.S3_PRIVATE_KEY,
//     region: 'ap-northeast-2',
// })
// const upload = multer({

//     storage : multerS3({
//         s3:s3,
//         bucket:'peacock-image',
//         //contetType 설정해줘야 링크를 눌러도 다운로드로 넘어가지 않음.
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//         key : function(req, file, cb) {
//             var ext = file.mimetype.split('/')[1];
//             if(!['png','jpg', 'jpeg'].includes(ext)) {
//                 return cb(new Error('Only images are allowed'));
//             }
//             cb(null, Date.now() + '_' + file.originalname.split('.').pop());
//         }
//     }),
//     acl : 'public-read-write',
//     limits: { fileSize: 5 * 1024 * 1024 },
// });

// module.exports = app =>{
//     //const multer = require('multer');
//     app.post('/imageUpload', upload.single('file'), async (req, res) => {
//         try{
//             console.log(req.file.location);
//             res.status(200).json({ location: `${req.file.location}`});
//         }catch(err){
//             console.error(err);
//             next(err)
//         }
        
        
//     });
// }