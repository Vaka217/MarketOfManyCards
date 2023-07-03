const express = require("express");
const router = express.Router();
const saleController = require("../controllers/saleController");

router.post("/createsales", saleController.createSale);
router.get("/searchsales", saleController.searchSale);
router.get("/searchsale/:id", saleController.searchSaleById);
router.get("/searchsalebycard/:id", saleController.searchSaleByCard);
router.put("/updatesale", saleController.updateSale);
router.put("/updatesalequantity/:id", saleController.updateSaleQuantity);
router.delete("/deletesale/:id", saleController.deleteSale);


module.exports = router;
