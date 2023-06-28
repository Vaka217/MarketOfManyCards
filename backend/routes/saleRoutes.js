const express = require("express");
const router = express.Router();
const saleController = require("../controllers/saleController");

router.post("/createsales", saleController.createSale);
router.get("/searchsales", saleController.searchSaleById);
router.get("/searchsale/:id", saleController.searchSale);
router.get("/searchsalebycard/:id", saleController.searchSaleByCard);
router.get("/updatesalequantity/:id", saleController.searchSaleByCard);

module.exports = router;
