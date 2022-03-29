const express = require("express");
const {
  test,
  getCoinNameFromKey,
  createWallet,
  getBalance,
  web3,
} = require("../controllers/testController");

const router = express.Router();

router.route("/").get(test);
// router.route("/:key").get(getCoinNameFromKey);
router.route("/getBalance").get(getBalance);
router.route("/create-wallet").get(createWallet);

module.exports = router;
