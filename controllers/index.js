const router = require('express').Router();

const htmlRoutes = require('./html');
const homeRoutes = require('./homepage');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/energy', htmlRoutes);
router.use('/api', apiRoutes);

module.exports = router;
