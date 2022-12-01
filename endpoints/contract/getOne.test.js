const createContract = require('./create')
const getContract = require('./getOne')
const { v4: uuidv4 } = require('uuid');

describe('Get contract by ID', () => {

  const contract = {
    contractName: "B2B",
    userID: "d52c387d-3907-42ec-924b-7d123d4cb403",
    templateID: "70f2e801-49bf-4082-b5cf-3d4c374e77d2",
  }

  const event_one = {
    body: JSON.stringify(contract)
  }

  const event_two = {
    queryStringParameters: {}
  }

  it('should get contract by ID', async () => {
    const document = await createContract.handler(event_one)
    expect(document).toBeDefined()

    const docBody = JSON.parse(document.body)
    event_two.queryStringParameters.id = docBody.contractID

    const res = await getContract.handler(event_two)
    expect(res).toBeDefined()
    expect(res.statusCode).toEqual(200)

    const body = JSON.parse(res.body)
    expect(body).toEqual({
      ...contract,
      contractID: docBody.contractID
    })
  })

  it('should get contract by id - not found', async () => {
    const newGeenratedId = uuidv4()
    event_two.queryStringParameters.id = newGeenratedId

    const res = await getContract.handler(event_two)

    expect(res).toBeDefined()
    expect(res.statusCode).toEqual(404)

    const body = JSON.parse(res.body)
    expect(body.error).toEqual('contract not found')
  })

  it('should get contract by id - invalid input', async () => {
    delete event_two.queryStringParameters.id
    const res = await getContract.handler(event_two)

    expect(res).toBeDefined()
    expect(res.statusCode).toEqual(400)

    const body = JSON.parse(res.body)
    expect(body.error).toEqual('invalid input')
  })
})