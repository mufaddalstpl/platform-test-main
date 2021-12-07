const UsersServices = require('../services/app');

const uploadCsv = async (req, res) => {
  return await UsersServices.uploadCsv(req, res);
}

module.exports = {
  uploadCsv
}