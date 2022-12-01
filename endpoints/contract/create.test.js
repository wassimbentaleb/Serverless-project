const createContract = require('./create')

describe('Create new contract tests', () => {
  const event_one = {
    body: JSON.stringify({
      contractName: "B2B",
      userID: "d52c387d-3907-42ec-924b-7d123d4cb403",
      templateID: "70f2e801-49bf-4082-b5cf-3d4c374e77d2",
    })
  }

  const event_two = {
    body: JSON.stringify({
      userID: "d52c387d-3907-42ec-924b-7d123d4cb403",
      templateID: "70f2e801-49bf-4082-b5cf-3d4c374e77d2",
    })
  }

  it('should create new contract', async () => {
    const res = await createContract.handler(event_one)

    expect(res).toBeDefined()
    expect(res.statusCode).toEqual(201)

    const body = JSON.parse(res.body)
    expect(body.contractID).toBeDefined()
  })

  it('should create new contract - invalid input', async () => {
    const res = await createContract.handler(event_two)

    expect(res).toBeDefined()
    expect(res.statusCode).toEqual(400)

    const body = JSON.parse(res.body)
    expect(body.error).toEqual('invalid input')
  })
})