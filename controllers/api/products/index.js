const router = require("express").Router();

const { Product, Review } = require("../../../models");
const withAuth = require("../../../utils/auth");

// create a new product (/api/products/)
router.post("/", withAuth, async (req, res) => {
  try {
    const newProduct = await Product.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a product (/api/products/:id)
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get solar cat (/api/products/solar)
router.get("/solar", withAuth, async (req, res) => {
  try {
    const solarData = await Product.findAll({
      where: {
        category: "solar",
      },
      include: [
        {
          model: Review,
          attributes: ["review_data", "user_id", "date_created", "product_id"],
        },
      ],
    });

    const solarProduct = solarData.map((solar) => solar.get({ plain: true }));

    res.render("allsolar", {
      solarProduct,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get wind cat (/api/products/wind)
router.get("/wind", withAuth, async (req, res) => {
  try {
    const windData = await Product.findAll({
      where: {
        category: "wind",
      },
      include: [
        {
          model: Review,
          attributes: ["review_data", "user_id", "date_created", "product_id"],
        },
      ],
    });

    const windProduct = windData.map((wind) => wind.get({ plain: true }));

    res.render("allwind", {
      windProduct,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get heat cat (/api/products/heat)
router.get("/heat", withAuth, async (req, res) => {
  try {
    const heatData = await Product.findAll({
      where: {
        category: "heat",
      },
      include: [
        {
          model: Review,
          attributes: ["review_data", "user_id", "date_created", "product_id"],
        },
      ],
    });

    const heatProduct = heatData.map((heat) => heat.get({ plain: true }));

    res.render("allheat", {
      heatProduct,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
