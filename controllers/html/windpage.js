const router = require('express').Router()
const { Product, User, Review } = require('../../models');
const withAuth = require('../../utils/auth');

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