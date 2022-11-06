const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//app.use(express.json());
//// express���� json �����͸� �Ľ��ϴ� ����� ����Ǿ��ִ�.
//// ������ json�� �ǰ� x-www-form-urlencoded�� �Ľ��ϱ� ���ؼ� �Ʒ��� Ȯ���ؾ� �Ѵ�.
//app.use(express.urlencoded({
//    extended: true
//}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});


require("./app/routes/user.routes.js")(app);

// ��Ʈ�ѹ� ����
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
})
