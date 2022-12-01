'use strict';

const db = require('../../database/dynamo')
const { created, badRequest, serverError } = require('../../utils/responses')

exports.handler = async (event, _, callback) => {

  const contract = JSON.parse(event.body)

  if (!contract.userID || !contract.templateID || !contract.contractName)
    return badRequest('invalid input')

  const result = await db
    .save(contract)
    .catch(err => {
      console.error('error while saving new contract', err.message)
      return callback(serverError(err.message), null)
    })

  console.info(`contract created under this identifier: ${result.contractID}`)
  const response = { contractID: result.contractID }

  return created(response)
}
