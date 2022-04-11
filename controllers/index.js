const router = require('express').Router();

const apiRoutes = require('./html');
// const homeRoutes = require('./homeRoutes');

// router.use('/', homeRoutes);
router.use('/', apiRoutes);

module.exports = router;
