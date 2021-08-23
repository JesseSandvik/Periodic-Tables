function onlyValidProperties(VALID_PROPERTIES) {
    return function (req, res, next) {
      const { data = {} } = req.body;
      const invalidFields = Object.keys(data).filter(
        (field) => !VALID_PROPERTIES.includes(field)
      );
  
      if (invalidFields.length) {
        return next({
          status: 400,
          message: `Invalid field(s): ${invalidFields.join(", ")}.`,
        });
      }
      next();
    };
}
  
module.exports = onlyValidProperties;