const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const whitelist = ["http://localhost:3000"];

const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        res.send(err);
        callback(new Error("Not Allowed Origin!"));
      }
    },
  };

//보안 취약하지만 그냥 모든 주소를 허용 하는 걸로 오류 확인 
app.use(cors());
//app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/image', express.static('./upload'));
app.get("/", (req, res)=>{
    res.json({message: "Hello World!"});
});

require("./app/routes/cloth.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/login.routes.js")(app);

// 포트넘버 설정
app.listen(3000, ()=>{
    console.log("Server is running on port 3000.");
})