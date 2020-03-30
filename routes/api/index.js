const router = require("express").Router();
const bookRoutes = require("../api/books");

// Book routes
router.use("/books", bookRoutes);

module.exports = router;
