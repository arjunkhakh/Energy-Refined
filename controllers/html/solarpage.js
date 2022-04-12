const router = require('express').Router()
const { Product, User, Review } = require('../../models');
const withAuth = require('../../utils/auth');

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