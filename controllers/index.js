const router = require('express').Router();

const htmlRoutes = require('./html');
const homeRoutes = require('./homepage');

router.use('/', homeRoutes);
router.use('/energy', htmlRoutes);

module.exports = router;
