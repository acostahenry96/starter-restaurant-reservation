const service = require("./dashboard.service");

async function list(req, res, next){
    /*ALL THATS LEFT HERE IS TO TAKE AN INPUT DATE*/
    /* const { date } = req.params or req.query*/
    const knexInstance = req.app.get("db");
    let currentDate = new Date();
    const dd = String(currentDate.getDate()).padStart(2, '0');
    const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = currentDate.getFullYear();
    currentDate = `${mm}/${dd}/${yyyy}`;
    const data = await service.list(knexInstance, currentDate);
    res.status(200).json({ data: "DASHBOARD" });
    return;
};

module.exports = {
    list
};