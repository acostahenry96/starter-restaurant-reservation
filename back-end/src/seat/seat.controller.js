const service = require("./seat.service");

async function update(req, res, next){   
    console.log("req.body", req.body)
    const newSeat = req.body.data;
    const knexInstance = req.app.get("db");
    const data = await service.update(knexInstance, newSeat);
    res.json({ data });
    return;
};

module.exports = {
    update
};