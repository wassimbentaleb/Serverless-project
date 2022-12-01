const createContract = require('./create')
const getContractIDs = require('./getIDs')

describe('Get all contract IDs', () => {

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

  const event_one = {
    body: JSON.stringify(contract_one)
  }

  const event_two = {
    body: JSON.stringify(contract_two)
  }

  it('should get all contract IDs', async () => {
    const document_one = await createContract.handler(event_one)
    expect(document_one).toBeDefined()

    const document_two = await createContract.handler(event_one)
    expect(document_two).toBeDefined()


    const idOne = JSON.parse(document_one.body).contractID
    const idTwo = JSON.parse(document_two.body).contractID

    const res = await getContractIDs.handler()
    expect(res).toBeDefined()
    expect(res.statusCode).toEqual(200)

    const body = JSON.parse(res.body)
    expect(body).toContainEqual({ contractID: idOne })
    expect(body).toContainEqual({ contractID: idTwo })
  })
})