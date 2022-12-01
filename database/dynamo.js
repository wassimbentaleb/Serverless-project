'use strict';

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const options = {
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'DEFAULT_ACCESS_KEY',
  secretAccessKey: 'DEFAULT_SECRET'
}

if (process.env.JEST_WORKER_ID) {
  options.region = 'local-env'
}

const tableName = 'contracts'
const documentClient = new AWS.DynamoDB.DocumentClient(options)

exports.save = async document => {

  // generate new identifier
  document.contractID = uuidv4()

  // save the document in the database
  await documentClient.put({
    TableName: tableName,
    Item: document,
  }).promise()

  return document
}

exports.getOne = async contractID => {

  const document = await documentClient.get({
    TableName: tableName,
    Key: { contractID },
  }).promise()

  return document ? document.Item : document
}

exports.getIDs = async () => {

  const contractIDs = await documentClient.scan({
    TableName: tableName,
    AttributesToGet: ['contractID'],
  }).promise()

  return contractIDs.Items
}