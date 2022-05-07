const router = require("express").Router();

const { User } = require("../../models");

// Login (POST /api/login)
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

// Logout (POST /api/logout)
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
