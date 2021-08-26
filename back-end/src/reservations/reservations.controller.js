const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const onlyValidProperties = require("../errors/onlyValidProperties");

// SET UP FOR VALIDATION
const REQUIRED_PROPERTIES = [
  "first_name",
  "last_name",
  "people",
  "mobile_number",
  "reservation_date",
  "reservation_time",
];
const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "people",
  "status",
  "mobile_number",
  "reservation_date",
  "reservation_time",
];
const UPDATE_REQUIRED_PROPERTIES = [
  "first_name",
  "last_name",
  "people",
  "mobile_number",
  "reservation_date",
  "reservation_time",
];
const UPDATE_VALID_PROPERTIES = [
  "reservation_id",
  "status",
  "created_at",
  "updated_at",
  "first_name",
  "last_name",
  "people",
  "mobile_number",
  "reservation_date",
  "reservation_time",
];

const hasOnlyValidProperties = onlyValidProperties(VALID_PROPERTIES);
const hasRequiredProperties = hasProperties(REQUIRED_PROPERTIES);
const hasOnlyValidUpdateProperties = onlyValidProperties(
  UPDATE_VALID_PROPERTIES
);
const hasRequiredUpdateProperties = hasProperties(UPDATE_REQUIRED_PROPERTIES);
const hasOnlyStatus = onlyValidProperties(["status"]);
const hasRequiredStatus = hasProperties(["status"]);

// MIDDLEWARE FUNCTIONS
async function reservationExists(req, res, next) {
  const { reservationId } = req.params;
  const reservation = await service.read(reservationId);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservationId} cannot be found.`,
  });
}

function reservationIdIsCorrectIfPresent(req, res, next) {
  const { reservationId } = req.params;
  const { reservation_id } = res.locals.reservation;
  if (!reservation_id || Number(reservation_id) === Number(reservationId)) {
    return next();
  }
  next({
    status: 400,
    message: `reservation_id '${reservation_id}' should be absent or match url '${reservationId}'.`,
  });
}

function hasValidDate(req, res, next) {
  const date = req.body.data.reservation_date;
  const valid = Date.parse(date);
  if (valid) {
    return next();
  }
  next({
    status: 400,
    message: `reservation_date '${date}' is not a date.`,
  });
}

function hasValidTime(req, res, next) {
  const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  const time = req.body.data.reservation_time;
  const valid = time.match(regex);
  if (valid) {
    return next();
  }
  next({
    status: 400,
    message: `reservation_time '${time}' is not a time.`,
  });
}

function hasValidPeople(req, res, next) {
  const people = req.body.data.people;
  const valid = Number.isInteger(people);
  if (valid && people > 0) {
    return next();
  }
  next({
    status: 400,
    message: `people '${people}' is not a valid integer`,
  });
}

function hasValidStatus(req, res, next) {
  const { status } = req.body.data;
  if (
    status === "booked" ||
    status === "seated" ||
    status === "finished" ||
    status === "cancelled"
  ) {
    return next();
  }
  next({
    status: 400,
    message: `status '${status}' should be: 'booked', 'seated', or 'finished'.`,
  });
}

function statusIsBooked(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "booked") {
    return next();
  }
  next({
    status: 400,
    message: `status should be "booked", received '${status}'.`,
  });
}

function statusIsBookedIfPresent(req, res, next) {
  const { status } = req.body.data;
  if (!status || status === "booked") {
    return next();
  }
  next({
    status: 400,
    message: `status should be "booked" or absent, received '${status}'`,
  });
}

function statusIsNotFinished(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "finished") {
    return next({
      status: 400,
      message: `Cannot update a reservation where status is already 'finished'.`,
    });
  }
  next();
}

function noReservationsOnTuesdays(req, res, next) {
  const reservation_date = req.body.data.reservation_date;
  const weekday = new Date(reservation_date).getUTCDay();
  if (weekday !== 2) {
    return next();
  }
  next({
    status: 400,
    message: `The restaurant is closed on Tuesdays.`,
  });
}

function noReservationsInPast(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const presentDate = Date.now();
  const newReservationDate = new Date(`${reservation_date} ${reservation_time}`).valueOf();
  if (newReservationDate > presentDate) {
    return next();
  }
  next({
    status: 400,
    message: `New reservations must be in the future.`,
  });
}

function reservationIsDuringBusinessHours(req, res, next) {
  const reservation_time = req.body.data.reservation_time;
  const hours = Number(reservation_time.slice(0, 2));
  const minutes = Number(reservation_time.slice(3, 5));
  const clockTime = hours * 100 + minutes;
  if (clockTime < 1030 || clockTime > 2130) {
    next({
      status: 400,
      message: `Reservation time '${reservation_time}' must be between 10:30 AM and 9:30 PM`,
    });
  }
  next();
}

// CRUD FUNCTIONS
async function create(req, res) {
  const newReservation = { ...req.body.data, status: "booked" };
  const data = await service.create(newReservation);
  res.status(201).json({ data });
}

function read(req, res) {
  const data = res.locals.reservation;
  res.json({ data });
}

async function update(req, res) {
  const updatedReservation = { ...req.body.data };
  const { reservationId } = req.params;
  const data = await service.update(reservationId, updatedReservation);
  res.status(200).json({ data });
}

async function updateStatus(req, res) {
  const { status } = req.body.data;
  const { reservationId } = req.params;
  
  const data = await service.updateStatus(reservationId, status);
  res.status(200).json({ data })
}

async function list(req, res) {
  const { date, viewDate, mobile_number } = req.query;
  if (date) {
    const data = await service.listByDate(date);
    res.json({ data });
  } else if (viewDate) {
    const data = await service.listByDate(viewDate);
    res.json({ data });
  } else if (mobile_number) {
    const data = await service.listByPhone(mobile_number);
    res.json({ data });
  } else {
    const data = await service.list();
    res.json({ data });
  }
}

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidDate,
    hasValidTime,
    hasValidPeople,
    statusIsBookedIfPresent,
    noReservationsOnTuesdays,
    noReservationsInPast,
    reservationIsDuringBusinessHours,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), read],
  update: [
    asyncErrorBoundary(reservationExists),
    reservationIdIsCorrectIfPresent,
    hasOnlyValidUpdateProperties,
    hasRequiredUpdateProperties,
    hasValidDate,
    hasValidTime,
    hasValidPeople,
    statusIsBooked,
    noReservationsOnTuesdays,
    noReservationsInPast,
    reservationIsDuringBusinessHours,
    asyncErrorBoundary(update),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    hasOnlyStatus,
    hasRequiredStatus,
    hasValidStatus,
    statusIsNotFinished,
    asyncErrorBoundary(updateStatus),
  ],
  list: asyncErrorBoundary(list),
};