const router = require('express').Router();

const heatRoutes = require('./heat');
const windRoutes = require('./wind');
const solarRoutes = require('./solar');

router.use('/heat', heatRoutes);
router.use('/wind', windRoutes);
router.use('/solar', solarRoutes);

module.exports = router;
