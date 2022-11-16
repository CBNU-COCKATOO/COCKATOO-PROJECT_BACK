const Follow = require("../models/follow.model.js");

exports.follow = (req, res) => {
    if (!req.body.follower_id || !req.body.followee_id) {
        res.status(400).json({
            message: "Content can not be empty!"
        });
    }else{
        const follow = new Follow({
            follower_id : req.body.follower_id,
            followee_id : req.body.followee_id
        });
    
        if(follow.follower_id == follow.followee_id){
            res.status(400).json({
                message:"자신은 팔로우할 수 없습니다."
            })
        }else{
            Follow.check(new Follow(req.body), (err, data) => {
                if(err.kind=="not_found"){
                    Follow.create(new Follow(req.body),
                    (err, data)=>{
                        if (err) {
                            res.status(500).json({
                                message:
                                    err.message || "Some error occured while following."
                            });
                        }
                        else{
                            res.json({
                                message:"성공적으로 팔로우했습니다."
                            });
                        }
                        
                    })
                }else{
                    // res.json({
                    //     message: "이미 팔로우중입니다."
                    // })
                    Follow.check(
                        new Follow(req.body),
                        (err, data) => {
                            if(err.kind=="not_found"){
                                res.json({
                                    message: "팔로우를 해야합니다."
                                })
                            }else{
                                Follow.delete(new Follow(req.body), (err,data) =>{
                                    if (err) {
                                        if (err.kind == "not_found") {
                                            res.status(404).json({
                                                message: "팔로우 목록을 찾을 수 없습니다."
                                            });
                                        } else {
                                            res.status(500).json({
                                                message: "팔로우 해제를 할 수 없습니다."
                                            });
                                        };
                                    } 
                                    else{
                                        res.json({ 
                                        message: "성공적으로 팔로우가 해제 됐습니다." 
                                        })
                                    };
                                })
                            };
                        }
                    );
                };
            })
        }
    }

    
};
// exports.unfollow = (req, res) => {
//     if (!req.body) {
//         res.status(400).json({
//             message: "Content can not be empty!"
//         });
//     }

    
// };
exports.follow_closet = (req, res) =>{
    Follow.List(req.params.userId, (err,data)=>{
        if(err.kind=="not_found"){
            res.json({
                message: "팔로우 하는 사람이 없습니다."
            })
        }else res.json(data);
    })
};