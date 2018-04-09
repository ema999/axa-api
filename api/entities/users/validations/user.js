var Joi = require('joi');

module.exports = {

  login: {
    body: {
      email: Joi.string().email().required()
    }
  },

  getUserByName: {
    body: {
      name: Joi.string().required()
    }
  }

};
