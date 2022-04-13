const router = require('express').Router()
const { User } = require('../../../models');

router.delete('/userpage', async (req, res) => {
    try {
    const userData = await User.update({
        where: {
          name: req.params.name,
          email: req.params.email,
          password: req.params.password,
        },
      });

    res.status(200).json(userData);
    } catch (err) {
    res.status(400).json(err);
    }
});