const router = require("express").Router();

const productController = require("./productRoutes");
const reviewsController = require("./reviewRoutes");
const userController = require("./userRoutes");
const authControlller = require("./authRoutes")

router.use("/users", userController);
router.use("/products", productController);
router.use("/reviews", reviewsController);
router.use("/", authControlller)

module.exports = router;
