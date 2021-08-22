const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function list(req, res) {
  const data = await reservationsService.list();
  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
};
