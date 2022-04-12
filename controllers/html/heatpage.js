const router = require('express').Router()
const { Product, User, Review } = require('../../models');
const withAuth = require('../../utils/auth');

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
  