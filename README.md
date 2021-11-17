# Fetch Rewards Take Home Backend Engineer Assessment

A RESTful API web service for keeping track of points accumulated from transactions to be spent by users.

- A `user` has `points` in their account from `payers`.
- `transactions` are submitted from payers to add points to a user's account.
- Users can `spend` points.
  - the oldest points are spent first based on their timestamp.

## Technologies used

- [Node](https://nodejs.org/) - Open-source, cross-platform JavaScript runtime environment
- [Express](https://expressjs.com/) - Back end Node.js server framework for building web apps and APIs

## Getting Started

1. Check if Node is installed.

   ```
   node --version
   ```

   if not download and install Node here [Node](https://nodejs.org/).

2. Clone this repo
   ```
   git clone git@github.com:kylecombs/fetch-rewards-backend-assessment.git
   ```
3. Go to the project's root directory

4. Install dependencies
   ```
   npm install
   ```
5. Start the server
   ```
   node app.js
   ```
   Your terminal should read:
   ```
   listening on port 1337
   ```
6. Visit http://localhost:1337/api/balance on your browser.
   you should initially see an empty object indicating that the user currently has no points

## Test web service using API platform such as Postman

add transactions via POST request to http://localhost:1337/api/add-points with the request body in the format below

```
{ "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }
```

spend points via put request to http://localhost:1337/api/spend-points with the request body in the format below

```
{ "points": 5000 }
```

get the user's total balance via GET request to http://localhost:1337/api/user-balance

get the user's balance displaying points per payer with GET request to http://localhost:1337/api/balance
