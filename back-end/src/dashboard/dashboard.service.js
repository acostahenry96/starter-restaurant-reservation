        /*NEEDS RETURN ALL OF TODAYS RESERVATIONS  */
const list = (knex, date) => 
    knex("reservations")
        .select("*")
        .where("date_of", date);

//i could do orderby("last_name")

module.exports = {
    list
};