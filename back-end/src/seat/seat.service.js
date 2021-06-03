
const update = (knex, newSeat) => 
    knex("tables")
        .where("table_id", newSeat.tableId)
        .insert(newSeat.reservationId);

module.exports = {
    update
}