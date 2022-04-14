const router = require("express").Router();
const { User } = require("../../../models");
const withAuth = require("../../../utils/auth");

// Create a user (/api/users)
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Edit a user (/api/users)
router.put("/", withAuth, async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.session.user_id,
      },
    });

    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a user (/api/users/123)
router.delete("/", async (req, res) => {
  try {
    const userData = await User.destroy(req.body);

    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
