
const db = require('./dynamo')
const { v4: uuidv4 } = require('uuid');

describe('Dynamo db tests', () => {
  const contract_one = {
    contractName: "B2B",
    userID: "d52c387d-3907-42ec-924b-7d123d4cb403",
    templateID: "70f2e801-49bf-4082-b5cf-3d4c374e77d2",
  }

  const contract_two = {
    contractName: "New B2B",
    userID: "ab3487d-3907-42ec-924b-7d123d4cb403",
    templateID: "924be801-49bf-4082-b5cf-3d4c374e77d2",
  }

  it('should save new contract', async () => {
    const res = await db.save(contract_one)

    expect(res).toBeDefined()
    expect(res.contractID).toBeDefined()

    expect(res.contractName).toBe(contract_one.contractName)
    expect(res.userID).toBe(contract_one.userID)
  })

  it('should get contract by ID', async () => {
    const document = await db.save(contract_two)
    expect(document).toBeDefined()

    const res = await db.getOne(document.contractID)

    expect(res).toBeDefined()
    expect(res.contractName).toBe(contract_two.contractName)
    expect(res.userID).toBe(contract_two.userID)
  })

  it('should get contract by ID - not found', async () => {
    const newGeenratedId = uuidv4()
    const res = await db.getOne(newGeenratedId)

    expect(res).toBeUndefined()
  })

  it('should get all contract IDs', async () => {
    const res = await db.getIDs()

    expect(res).toBeDefined()
    expect(res.length).toBeGreaterThanOrEqual(2)

    expect(res[0].contractID).toBeDefined()
    expect(res[1].contractID).toBeDefined()
  })
})

