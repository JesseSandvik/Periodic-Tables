const knex = require("../db/connection");

function create(newReservation) {
    return knex("reservations")
        .insert(newReservation, "*")
        .then((createdReservation) => createdReservation[0]);
}

function list() {
    return knex("reservations")
        .select("*");
}

module.exports = {
    create,
    list,
}