const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((result) => result[0]);
}

function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .then((result) => result[0]);
}

function update(reservation_id, updatedReservation) {
  return knex("reservations")
    .where({ reservation_id })
    .update({ ...updatedReservation }, "*")
    .then((result) => result[0]);
}

function updateStatus(reservation_id, status) {
  return knex("reservations")
    .where({ reservation_id })
    .update({ status }, "*")
    .then((result) => result[0]);
}

function list() {
  return knex("reservations");
}

function listByDate(reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .whereNot({ status: "finished" })
    .whereNot({ status: "cancelled" })
    .orderBy("reservation_time");
}

function listByPhone(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  create,
  read,
  update,
  updateStatus,
  list,
  listByDate,
  listByPhone,
};