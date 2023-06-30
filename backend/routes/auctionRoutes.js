const express = require("express");
const router = express.Router();
const auctionController = require("../controllers/auctionController");

router.post("/createauction", auctionController.createAuction);
router.post("/makebid", auctionController.makeBid);
router.get("/searchauctionwinners", auctionController.searchAuctionWinners);
router.get("/searchauctions", auctionController.searchAuctions);
router.get("/searchauction/:id", auctionController.searchAuctionById);
router.get("/searchauctionbycard/:id", auctionController.searchAuctionBycard);
router.put("/updateauction", auctionController.updateAuction);
router.put("/updateauctionquantity", auctionController.updateAuctionQuantity);


module.exports = router;