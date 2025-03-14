const Coupon = require('../models/Coupon');
const User = require('../models/User');

const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ message: "Error fetching coupons" });
    }
};

const claimCoupon = async (req, res) => {
    const { ipAddress } = req;
    try {
        // Check if the user has claimed a coupon recently
        const user = await User.findOne({ ipAddress });
        if (user && user.lastClaimed && Date.now() - user.lastClaimed < 3600000) {
            return res.status(400).json({ message: "You can claim another coupon in an hour." });
        }

        // Find the next available coupon
        const coupon = await Coupon.findOne({ claimedBy: null });
        if (!coupon) {
            return res.status(404).json({ message: "No coupons available." });
        }

        // Assign the coupon to the user
        coupon.claimedBy = user?._id || null;
        coupon.claimedAt = new Date();
        await coupon.save();

        // Update user's last claimed timestamp
        if (user) {
            user.lastClaimed = new Date();
            await user.save();
        } else {
            await User.create({ ipAddress, lastClaimed: new Date() });
        }

        res.json({ message: "Coupon claimed successfully!", coupon });
    } catch (error) {
        res.status(500).json({ message: "Error claiming coupon" });
    }
};

module.exports = {
    getCoupons,
    claimCoupon
};