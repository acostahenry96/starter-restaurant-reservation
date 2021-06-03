const create = (knex, newTable) => 
    knex("tables")
        .returning("*")
        .insert(newTable);
    
const update = (knex, table_id, reservation_id) =>
    knex("tables")
        .where("table_id", table_id)
        .update({ "reservation_id" : reservation_id });

const updateStatus = (knex, reservation_id, status) => 
    knex("reservations")
        .where("reservation_id", reservation_id)
        .update({"status" : status });

const list = (knex) => 
    knex("tables")
        .select("*")
        .orderBy("table_name");

const destroy = (knex, table_id) => 
    knex("tables")
        .where("table_id", table_id)
        .update({ "reservation_id" : null})
        .returning("*");

module.exports = {
    create,
    update,
    list,
    destroy,
    updateStatus
}