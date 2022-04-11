const router = require('express').Router();
const homeRoutes = require('./homepage');
const productRoutes = require('./products');

router.use('/homepage', homeRoutes);
router.use('/products', productRoutes);

module.exports = router;
