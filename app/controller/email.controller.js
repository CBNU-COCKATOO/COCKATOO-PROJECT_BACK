const nodemailer = require('nodemailer');
require('dotenv').config();
let ac;
exports.EmailSend = async(req, res) =>{
    const u_emailaddress = req.body.u_email;
    let authNum = Math.random().toString(36).substring(3,7);
    ac = authNum;
    console.log(authNum);
    //const hashAuth = await bcrypt.hash(authNum, 12);

    let transporter = nodemailer.createTransport({
        // 사용하고자 하는 서비스, gmail계정으로 전송할 예정이기에 'gmail'
        service: 'gmail',
        //host를 gmail로 설정
        // host: 'smtp.gmail.com',
        // port: 587,
        // secure: false,
        auth: {
          //Gmail 주소
          user: process.env.NODEMAILER_USER,
          //Gmail 패스워드
          pass: process.env.NODEMAILER_PASS,
        },
      });
    
      let mailOptions = {
        //보내는 곳의 이름과, 메일 주소를 입력
        from: `[COCKATOO Team] <${process.env.NODEMAILER_USER}>`,
        //사용자 메일 주소
        to: u_emailaddress,
        //메일 제목
        subject: 'PEACOCK 이메일 인증',
        //메일 내용
        text: authNum,
        html: `
        <h1 style="color: #7939FF">PEACOCK 이메일 인증</h1>
        <br/><br/>
        <div>
          아래 번호를 적어 인증을 완료해주세요. 
          <br/>
          <b>${authNum}</b>
        </div>`,
      }
      const info = await transporter.sendMail(mailOptions);
      console.log('메세지 전송됨: %s', info.messageId);

      res.json({message:"메일 발송 성공"});
};

exports.EmailCheck = (req, res) =>{
    let AuthCode = req.body.u_authNum;
    console.log("정답"+ac+" 입력:"+AuthCode);
    //const hashAuth = await bcrypt.hash(authNum, 12);
    try {
        // if(AuthCode == res.locals.authNum) {
        if(AuthCode == ac) {
          res.json({ message : "이메일 인증에 성공했습니다." });
        }
        else {
          res.json({ message : "인증에 실패했습니다." });
        }
      } catch(err) {
        res.json({ message : "인증에 실패했습니다." });
        console.error(err);
      }
    
};