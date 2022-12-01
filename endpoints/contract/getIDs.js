'use strict';

const db = require('../../database/dynamo')
const { success, serverError } = require('../../utils/responses')

exports.handler = async (event, _, callback) => {

  const contractIDs = await db
    .getIDs()
    .catch(err => {
      console.error('error while retrieving contract ids', err.message)
      return callback(serverError(err.message), null)
    })

  console.info(`retrieved an array with ${contractIDs.length} contract id`)
  return success(contractIDs)
}
