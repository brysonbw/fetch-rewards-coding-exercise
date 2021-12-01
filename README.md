## Fetch Rewards Coding Exercise

### Web Service JSON/Data Types

- "id": <integer>,
  "payer": <string>,
  "points": <integer>,
  "timestamp": <dateTime>

### Web Service Functionality (example):

- Add transactions ~ REQUEST: { "payer": "example", "points": 10 }
- RESPONSE: {
  "payer": "EXAMPLE",
  "points": 10
  }
- Spend points for each transaction ~ REQUEST: { id } = req.params { "points": 3 }
- RESPONSE: {
  "payer": "EXAMPLE",
  "points": 7 - Returns the difference
  }
- Get the sum of all points for a specific payer ~ REQUEST: { "payer": "example" }
- RESPONSE: [
  {
  "payer": "EXAMPLE",
  "_sum": {
  "points": 7
  }
  }
  ]
  \*Greater sum if "payer": "example" > 1 transaction

  ### Copy Heroku link, add API route/call to '/', and run in Postman

  - api/transaction/all
  - api/transaction/add
  - api/transaction/payerBalance
  - api/transaction/spendPoints/:id
  - api/transaction/delete/:id
