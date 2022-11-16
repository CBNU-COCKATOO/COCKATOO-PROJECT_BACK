module.exports =app =>{
    const ColorThief = require('colorthief');

    app.post("/getcolor", (req, res)=>{
        const img = req.body.clo_image;

        ColorThief.getColor(img)
            .then(color => { 
                res.json(color)
             })
            .catch(err => { 
                console.log(err);
                res.json({
                    message: "이미지 색상 추출에 실패했습니다."
                })
            
            })
    })
}