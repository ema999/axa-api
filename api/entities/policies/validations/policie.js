var Joi = require('joi');

module.exports = {

  getPoliciesByUserName: {
    body: {
      name: Joi.string().required()
    }
  }

};
