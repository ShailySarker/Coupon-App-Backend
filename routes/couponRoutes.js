const express = require("express");
const router = express.Router();

const { claimCoupon, getCoupons}  = require('../controllers/couponController');
const { trackUser}  = require('../middleware/abusePrevention');

router.get("/", getCoupons);
router.post("/:id/claim", trackUser, claimCoupon);

module.exports = router;