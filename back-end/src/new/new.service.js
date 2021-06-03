const create = (knex, newRes) => 
    knex("reservations")
        .returning("*")
        .insert(newRes);


module.exports = {
    create
}