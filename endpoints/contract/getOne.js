'use strict';

const db = require('../../database/dynamo')
const { success, badRequest, serverError, notFound } = require('../../utils/responses')

exports.handler = async (event, _, callback) => {

  if (!event.queryStringParameters || !event.queryStringParameters.id)
    return badRequest('invalid input')

  const contractID = event.queryStringParameters.id

  const contract = await db
    .getOne(contractID)
    .catch(err => {
      console.error('error while retrieving contract ids', err.message)
      return callback(serverError(err.message), null)
    })

  if (!contract)
    return notFound('contract not found')

  console.info(`retrieved a contract object by id ${contractID}`)
  return success(contract)
}
