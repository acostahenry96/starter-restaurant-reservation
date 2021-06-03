const service = require("./tables.service");

async function create(req, res, next){
    const knexInstance = req.app.get("db");
    const newTable = req.body.data;
    const data = await service.create(knexInstance, newTable);
    res.status(201).json({ data });
    return;
};

async function update(req, res, next){
    const knexInstance = req.app.get("db");
    const { table_id, reservation_id } = req.body;
    const data = await service.update(knexInstance, table_id, reservation_id);
    if (data){
        res.status(200).json({ data })
        return;
    };
    res.status(404).json({message: "Record not found"})
}

async function list(req, res, next){
    const knexInstance = req.app.get("db");
    let data = await service.list(knexInstance);
    res.status(200).json({ data });
    return;
};

async function destroy(req, res, next){
    console.log("DESTORY")
    const knexInstance = req.app.get("db");
    const { table_id } = req.params;
    console.log(req.params)
    const data = await service.destroy(knexInstance, table_id);
    res.status(200).json({ data: `Table ${table_id}: no longer has a reservation.` });
    return;
};


module.exports = {
    create,
    update,
    list,
    destroy
}