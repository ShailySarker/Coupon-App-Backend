const Coupon = require('../models/couponModel');
const User = require('../models/userModel');

const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ message: "Error fetching coupons" });
    }
};

const claimCoupon = async (req, res) => {
    const { id } = req.params; // Coupon ID
    const { ipAddress } = req; // User's IP address
    
    try {
        const coupon = await Coupon.findById(id);

        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found." });
        }

        if (coupon.claimedBy) {
            return res.status(400).json({ message: "Coupon already claimed." });
        }

        // Find the user by IP address or create one
        let user = await User.findOne({ ipAddress });
        if (!user) {
            user = await User.create({ ipAddress, lastClaimed: new Date() });
        }

        // Assign the user's ObjectId to claimedBy
        coupon.claimedBy = user._id;
        coupon.claimedAt = new Date();
        await coupon.save();

        // Update user's last claimed timestamp
        user.lastClaimed = new Date();
        await user.save();

        res.json({ message: "Coupon claimed successfully!", coupon });
    } catch (error) {
        console.error("Error claiming coupon:", error);
        res.status(500).json({ message: "Error claiming coupon" });
    }
};



module.exports = {
    getCoupons,
    claimCoupon
};