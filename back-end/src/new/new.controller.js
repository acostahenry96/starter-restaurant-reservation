const service = require("./new.service");

async function create(req, res, next){
    const knexInstance = req.app.get("db");
    const newReservation = req.body;
    const returningData = await service.create(knexInstance, newReservation);
    res.status(201).json({ data: `Data has been stored:${returningData}` });
    return;
};


module.exports = {
    create
}