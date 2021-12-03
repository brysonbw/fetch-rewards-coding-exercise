## Fetch Rewards Coding Exercise

### Web Service JSON/Data Types

- "id": <integer>,
  "payer": <string>,
  "points": <integer>,
  "timestamp": <dateTime>

### Web Service Functionality (example):

- Add transactions ~ REQUEST(BODY): { "payer": "example", "points": 10 }
- RESPONSE: {
  "payer": "EXAMPLE",
  "points": 10
  }
- Spend points for each transaction ~ REQUEST(PARAM): { id }
  REQUEST(BODY): { "points": 3 }
- RESPONSE: {
  "payer": "EXAMPLE",
  "points": 7 - Returns the difference
  }
- Get the sum of all points for a specific payer ~ REQUEST(BODY): { "payer": "example" }
- RESPONSE: [
  {
  "payer": "EXAMPLE",
  "_sum": {
  "points": 7
  }
  }
  ]

  - Greater "\_sum" if "payer": "example" has more than one transaction

  ### Copy Heroku link, add API route/call to '/', and run in Postman

  - api/transaction/all
  - api/transaction/add
  - api/transaction/payerBalance
  - api/transaction/spendPoints/:id
  - api/transaction/delete/:id

### Running in Postman

- Enter values - "payer": <string> & "points": <integer> as JSON in REQUEST(BODY)
- Example - { "payer": "enterPayerName", "points": enterPointsAmount }
