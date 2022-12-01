const { success, badRequest, serverError, notFound } = require('./responses')

describe('Responses tests', () => {
  test('Success response', () => {
    const contract = {
      ID: "996ce538-1482-44ee-bca6-10274949bdf7",
      contractName: "B2B",
      userID: "d52c387d-3907-42ec-924b-7d123d4cb403",
      templateID: "70f2e801-49bf-4082-b5cf-3d4c374e77d2",
    }

    const expectedBody = JSON.stringify(contract)
    const res = success(contract)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBe(expectedBody)
  })

  test('Bad request response', () => {
    const message = 'invalid contract ID'
    const expectedBody = JSON.stringify({
      error: message
    })

    const res = badRequest(message)

    expect(res.statusCode).toBe(400)
    expect(res.body).toBe(expectedBody)
  })

  test('Server error response', () => {
    const message = 'cannot connect to dynamodb'
    const expectedBody = JSON.stringify({
      error: message
    })

    const res = serverError(message)

    expect(res.statusCode).toBe(500)
    expect(res.body).toBe(expectedBody)
  })

  test('Not found response', () => {
    const message = 'contract not found'
    const expectedBody = JSON.stringify({
      error: message
    })

    const res = notFound(message)

    expect(res.statusCode).toBe(404)
    expect(res.body).toBe(expectedBody)
  })
})

