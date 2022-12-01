'use strict';

const responses = require('../utils/responses')

exports.handler = async (event, context) => {
  const authorization = event.headers.Authorization

  if (authorization != process.env.API_KEY) {
    context.end();
    return responses.unauthorized()
  }

  return
}
