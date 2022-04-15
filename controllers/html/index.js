const router = require("express").Router();
const { Product, User, Review } = require("../../models");
const withAuth = require("../../utils/auth");

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

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

router.get("/logout", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/products", (req, res) => {
  res.render("productchoice");
});

router.get("/products/solar", withAuth, (req, res) => {
  res.render("allsolar");
});

router.get("/products/heat", withAuth, (req, res) => {
  res.render("allheat");
});

router.get("/products/wind", withAuth, (req, res) => {
  res.render("allwind");
});


module.exports = router;
