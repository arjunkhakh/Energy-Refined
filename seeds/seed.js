const sequelize = require('../config/connection');
const { Product, Review, Comment } = require('../models');

const productData = require('./productData.json');
const reviewData = require('./reviewData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Product.bulkCreate(productData, {
    individualHooks: true,
    returning: true,
  });

  await Review.bulkCreate(reviewData, {
    individualHooks: true,
    returning: true,
  });

  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });
  
  process.exit(0);
};

seedDatabase();