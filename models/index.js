const User = require('./User');
const Review = require ('./Review');
const Product = require ('./Product');

// posts




// User.hasMany(Comment, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
// });

User.hasMany(Review, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});




Review.belongsTo(Product, {
    foreignKey: 'product_id',
    onDelete: "CASCADE"
})

// Review.hasMany(Comment, {
//     foreignKey: 'comment_id',
//     onDelete: "CASCADE"
// })


Product.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
});

Product.hasMany(Review, {
    foreignKey: 'review_id',
    onDelete: 'CASCADE'
});

// Comment.belongsTo(Review, {
//     foreignKey: 'review_id',
//     onDelete: 'CASCADE'
// });

// Comment.belongsTo(User, {
//     foreignKey: 'review_id',
//     onDelete: 'CASCADE'
// });

module.exports = { User, Product, Review };