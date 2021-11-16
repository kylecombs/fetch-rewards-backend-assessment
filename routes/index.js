const router = require('express').Router();
module.exports = router;

let points = {
  DANNON: 1000,
  UNILEVER: 0,
  'MILLER COORS': 5300,
};

router.get('/', (req, res) => {
  res.json(points);
});
