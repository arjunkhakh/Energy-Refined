const router = require("express").Router();
const { Product, User, Review } = require("../../models");
const withAuth = require("../../utils/auth");

// Render Homepage
router.get("/", async (req, res) => {
  try {
    res.render("homepage", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Information about the user
router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    res.render("userpage", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render Edit Account Page
router.get("/profile/edit", withAuth, async (req, res) => {
  res.render('edit-account');
})

// Render Login Page if not logged in, If Logged In then render Profile Page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

// Render Login Page when Logout Button has been pressed
router.get("/logout", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

// Render Signup Sheet
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Render Products Page
router.get("/products", (req, res) => {
  res.render("productchoice");
});

// Render Products Page By Category (Wind, Solar or Electric)
router.get("/products/category/:category", withAuth, async (req, res) => {
  const category = req.params.category;

  try {
    const productData = await Product.findAll({
      where: {
        category
      },
      include: [
        {
          model: Review,
          attributes: ["review_data", "user_id", "date_created", "product_id"],
        }
      ]
    });

    const  products = productData.map(product => product.get({plain: true}));

    res.render( 'products_by_category', {
      products,
      category,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// Render Single Product Page by Product ID
router.get("/products/:id", withAuth, async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id,{
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const products = productData.get({ plain: true });

    res.render( 'singleproduct', {
      ...products,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})


module.exports = router;
