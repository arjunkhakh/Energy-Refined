const router = require('express').Router()
const { Product, User, Review } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req,res) => {

try {
    res.render('homepage', {logged_in: req.session.logged_in})
} catch (err) {
    res.status(500).json(err);   
}

});

router.get('/userpage', withAuth, async (req, res) => {
    try {
    
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Project }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('userpage', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
router.get('/login', (req, res) => {

if (req.session.logged_in) {
    res.redirect('/profile');
    return;
}
  
    res.render('login');
});

// Get wind cat
router.get('/windpage', withAuth, async (req, res) => {

  try {
    
    const windData = await Product.findAll({
      where: {
        category: 'wind'
      },
      include: [
        {
          model: Review,
          attributes: ['review_data', 'user_id', 'date_created', 'product_id' ],
        },
      ],
    });

    const windProduct = windData.map((wind) => wind.get({ plain: true }));

    
    res.render('allwind', { 
      windProduct, 
      logged_in: req.session.logged_in 
    });

  } catch (err) {
    res.status(500).json(err);
  }

});

// Get solar cat
router.get('/solarpage', withAuth, async (req, res) => {

  try {
    
    const solarData = await Product.findAll({
      where: {
        category: 'solar'
      },
      include: [
        {
          model: Review,
          attributes: ['review_data', 'user_id', 'date_created', 'product_id' ],
        },
      ],
    });

    const solarProduct = solarData.map((solar) => solar.get({ plain: true }));

    
    res.render('allsolar', { 
      solarProduct, 
      logged_in: req.session.logged_in 
    });

  } catch (err) {
    res.status(500).json(err);
  }

});

// Get heat cat
router.get('/heatpage', withAuth, async (req, res) => {

  try {
    
    const heatData = await Product.findAll({
      where: {
        category: 'heat'
      },
      include: [
        {
          model: Review,
          attributes: ['review_data', 'user_id', 'date_created', 'product_id' ],
        },
      ],
    });

    const heatProduct = heatData.map((heat) => heat.get({ plain: true }));

    
    res.render('allheat', { 
      heatProduct, 
      logged_in: req.session.logged_in 
    });

  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;