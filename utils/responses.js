'use strict';

exports.success = response => {
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

exports.created = response => {
  return {
    statusCode: 201,
    body: JSON.stringify(response)
  }
}

exports.badRequest = message => {
  return {
    statusCode: 400,
    body: JSON.stringify({
      error: message
    })
  }
}

exports.unauthorized = () => {
  return {
    statusCode: 401,
    body: JSON.stringify({
      error: 'you should provide a valid api key'
    })
  }
}

exports.notFound = message => {
  return {
    statusCode: 404,
    body: JSON.stringify({
      error: message
    })
  }
}

exports.serverError = message => {
  return {
    statusCode: 500,
    body: JSON.stringify({
      error: message
    })
  }
}