module.exports = {
  tables: [
    {
      TableName: 'contracts',
      KeySchema: [{ AttributeName: 'contractID', KeyType: 'HASH' }],
      AttributeDefinitions: [{ AttributeName: 'contractID', AttributeType: 'S' }],
      ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
    }
  ]
}