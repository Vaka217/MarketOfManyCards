const express = require("express");
const router = express.Router();
const auctionController = require("../controllers/auctionController");

router.post("/createauction", auctionController.createAuction);
router.post("/makebid", auctionController.makeBid);
router.get("/searchauctionwinners/:id", auctionController.searchAuctionWinners);
router.get("/searchauctions", auctionController.searchAuctions);
router.get("/searchauction/:id", auctionController.searchAuctionById);
router.get("/searchauctionbycard/:id", auctionController.searchAuctionBycard);
router.put("/updateauction", auctionController.updateAuction);
router.put("/updateauctionquantity/:id", auctionController.updateAuctionQuantity);
router.delete("/deleteauction/:id", auctionController.deleteAuction);
router.get("/getuserbids/:id", auctionController.getUserBids);



module.exports = router;
