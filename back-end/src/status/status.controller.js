
async function update(req, res, next){
    const knexInstance = req.app.get("db");
    const { reservation_id } = req.params;
    const { status } = req.body.data;
    const data = await serviceUpdate(knexInstance, reservation_id, status);
    res.status(201).json({ data: `New status:${status}`})
    return;
};

const serviceUpdate = (knex, reservation_id, status) => 
    knex("reservations")
        .where("reservation_id", reservation_id)
        .update({"status" : status });


module.exports = {
    update
};