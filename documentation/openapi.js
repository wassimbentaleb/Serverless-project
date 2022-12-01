var spec = {
  "openapi": "3.0.1",
  "info": {
    "version": "1.0.0",
    "title": "Serverless Contract Management API Specification"
  },
  "paths": {
    "/createContract": {
      "post": {
        "summary": "Create a new contract",
        "operationId": "createContract",
        "tags": [
          "Contract API"
        ],
        "parameters": [
          {
            "$ref": "#/components/parameters/apiKey"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ContractRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ContractID"
                }
              }
            }
          },
          "400": {
            "$ref": "#/components/responses/BadRequest"
          },
          "401": {
            "$ref": "#/components/responses/Unauthorized"
          },
        }
      }
    },
    "/getContract": {
      "get": {
        "summary": "Get a stored contract by id",
        "operationId": "getContract",
        "tags": [
          "Contract API"
        ],
        "parameters": [
          {
            "$ref": "#/components/parameters/apiKey"
          },
          {
            "$ref": "#/components/parameters/contractID"
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Contract"
                }
              }
            }
          },
          "400": {
            "$ref": "#/components/responses/BadRequest"
          },
          "401": {
            "$ref": "#/components/responses/Unauthorized"
          },
          "404": {
            "$ref": "#/components/responses/NotFound"
          }
        }
      }
    },
    "/getContractIDs": {
      "get": {
        "summary": "Get a all contract IDs",
        "operationId": "getContractIDs",
        "tags": [
          "Contract API"
        ],
        "parameters": [
          {
            "$ref": "#/components/parameters/apiKey"
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ContractList"
                }
              }
            }
          },
          "401": {
            "$ref": "#/components/responses/Unauthorized"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "ContractID": {
        "properties": {
          "contractID": {
            "description": "Contract ID",
            "type": "string",
            "format": "uuid",
            "example": "d52c387d-3907-42ec-924b-7d123d4cb403"
          }
        }
      },
      "ContractRequest": {
        "properties": {
          "contractName": {
            "description": "Name of contract",
            "type": "string",
            "example": "B2B"
          },
          "userID": {
            "description": "User identifier",
            "type": "string",
            "format": "uuid",
            "example": "70f2e801-49bf-4082-b5cf-3d4c374e77d2"
          },
          "templateID": {
            "description": "Template identifier of the contract",
            "type": "string",
            "format": "uuid",
            "example": "70f2e801-49bf-4082-b5cf-3d4c374e77d2"
          }
        },
        "required": [
          "contractName",
          "userID",
          "templateID"
        ],
      },
      "ContractResponse": {
        "properties": {
          "contractID": {
            "$ref": "#/components/schemas/contractID"
          },
          "contractName": {
            "description": "Name of contract",
            "type": "string",
            "example": "B2B"
          },
          "userID": {
            "description": "User identifier",
            "type": "string",
            "format": "uuid",
            "example": "70f2e801-49bf-4082-b5cf-3d4c374e77d2"
          },
          "templateID": {
            "description": "Template identifier of the contract",
            "type": "string",
            "format": "uuid",
            "example": "924be801-49bf-4082-b5cf-3d4c374e77d2"
          }
        }
      },
      "ContractList": {
        "type": "array",
        "items": {
          "properties": {
            "contractID": {
              "description": "Contract ID",
              "type": "string",
              "format": "uuid",
              "example": "d52c387d-3907-42ec-924b-7d123d4cb403"
            }
          }
        }
      },
      "Error": {
        "required": [
          "message"
        ],
        "properties": {
          "message": {
            "type": "string",
            "example": "error message"
          }
        }
      }
    },
    "parameters": {
      "apiKey": {
        "name": "Authorization",
        "in": "header",
        "description": "Contract management api key",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "contractID": {
        "name": "id",
        "in": "query",
        "description": "Contract ID",
        "required": true,
        "schema": {
          "$ref": "#/components/schemas/contractID"
        }
      }
    },
    "responses": {
      "NotFound": {
        "description": "Resource not found",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/Error"
            }
          }
        }
      },
      "BadRequest": {
        "description": "Bad Request",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/Error"
            }
          }
        }
      },
      "Unauthorized": {
        "description": "Unauthorized Request",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/Error"
            }
          }
        }
      }
    },
    "securitySchemes": {
      "Authorization": {
        "type": "apiKey",
        "name": "Authorization",
        "in": "header"
      }
    }
  }
}