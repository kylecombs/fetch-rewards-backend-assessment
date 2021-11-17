const router = require('express').Router();
module.exports = router;

// global variables
const payerPoints = {};
let totalPoints = 0;
const transactions = [];

router.get('/balance', (req, res) => {
  res.json(payerPoints);
});

router.get('/user-balance', (req, res) => {
  res.json({ points: totalPoints });
});

router.post('/add-points', (req, res) => {
  let { payer, points, timestamp } = req.body;
  // formatting req.body
  payer = payer.toUpperCase();
  points = parseInt(points);
  totalPoints += points;
  transactions.push({ payer, points, timestamp });

  // sort transactions by timestamp
  transactions.sort((a, b) => {
    if (a.timestamp > b.timestamp) {
      return 1;
    } else if (a.timestamp < b.timestamp) {
      return -1;
    } else {
      return 0;
    }
  });

  // if payer does not exist in payerPoints add payer to Payer Points
  if (!payerPoints[payer]) {
    payerPoints[payer] = 0;
  }
  payerPoints[payer] += points;

  res.status(200).json({ transaction: req.body });
});

router.put('/spend-points', (req, res) => {
  let { points } = req.body;
  let spendTransactionsArray = [];
  let spendTransactions = {};
  points = parseInt(points);

  if (points < 0) {
    res.status(406).json({
      error: 'Points must be a positive integer, unable to process transaction',
    });
  } else if (totalPoints < points) {
    res
      .status(406)
      .json({ error: 'Not enough points, unable to process transaction' });
  } else {
    // spend points using transactions queue sorted by timestamp
    while (points > 0 && transactions.length > 0) {
      const mostRecentTransaction = transactions[0];
      // if the most recent transaction equals the points
      if (mostRecentTransaction.points === points) {
        payerPoints[mostRecentTransaction.payer] -= points;
        points = 0;
        if (!(mostRecentTransaction.payer in spendTransactions)) {
          spendTransactions[mostRecentTransaction.payer] -=
            mostRecentTransaction.points;
        }
        spendTransactions[mostRecentTransaction.payer] +=
          mostRecentTransaction.points;
        transactions.shift();
        // if the most recent transaction is greater that the amount of points
      } else if (mostRecentTransaction.points > points) {
        payerPoints[mostRecentTransaction.payer] -= points;
        mostRecentTransaction.points -= points;
        if (!(mostRecentTransaction.payer in spendTransactions)) {
          spendTransactions[mostRecentTransaction.payer] = 0;
        }
        spendTransactions[mostRecentTransaction.payer] += points;
        points = 0;
        // if the most recent transaction is less that the amount of points
      } else {
        payerPoints[mostRecentTransaction.payer] -=
          mostRecentTransaction.points;
        points -= mostRecentTransaction.points;
        if (!(mostRecentTransaction.payer in spendTransactions)) {
          spendTransactions[mostRecentTransaction.payer] = 0;
        }
        spendTransactions[mostRecentTransaction.payer] +=
          mostRecentTransaction.points;
        transactions.shift();
      }
    }

    // format spendTransactions object as list for response
    for (let key in spendTransactions) {
      spendTransactionsArray.push({
        payer: key,
        points: -spendTransactions[key],
      });
    }

    res.status(200).json(spendTransactionsArray);
  }
});
