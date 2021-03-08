const { clearHash } = require('../services/cache');

module.exports = async (req, res, next) => {
  // await will holds this middleware until the all req is completed
  await next();

  clearHash(req.user.id);
};
