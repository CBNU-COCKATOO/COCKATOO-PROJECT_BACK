const Search = require("../models/search.model.js");

exports.SearchAll = (req, res) => {
    Search.findByNAME(req.params.name, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).json({  
                    message:"검색 결과가 없습니다."
                });
            } else {
                res.status(500).json({
                    message: "Error retrieving User with " + req.params.name
                });
            }
        } else res.json(data);
    });
};