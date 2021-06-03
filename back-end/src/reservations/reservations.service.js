const reservationsController = require("./reservations.controller");

const checkForDate = (knex, selectedDate) => 
    knex("reservations")
        .where("reservation_date", selectedDate);

const search = (knex, mobile_number) => 
 knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");

const list = (knex) => 
    knex("reservations")
        .select("*");

const read = (knex, reservation_id) => 
    knex("reservations")
        .where("reservation_id", reservation_id);

const update = (knex, reservation_id, updatedReservation) => 
        knex("reservations")
            .where("reservation_id", reservation_id)
            .update(updatedReservation);

module.exports = {
    checkForDate,
    search,
    update,
    list,
    read
}