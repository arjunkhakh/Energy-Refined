const router = require("express").Router();

const productController = require("./products");
const reviewsController = require("./reviews");
const userController = require("./users");
const { User } = require("../../models");

router.post("/login", async (req, res) => {
  let userData;

  try {
    userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }

  if (!userData) {
    res
      .status(400)
      .send("Either the email address or the provided password incorrect");
    return;
  }

  const validPassword = userData.checkPassword(req.body.password);

  if (!validPassword) {
    res
      .status(400)
      .send("Either the email address or the provided password incorrect");
    return;
  }

  req.session.save(() => {
    req.session.user_id = userData.id;
    req.session.logged_in = true;

    res.status(200).json(userData.get({ plain: true }));
  });
});

router.use("/users", userController);
router.use("/products", productController);
router.use("/reviews", reviewsController);

module.exports = router;
