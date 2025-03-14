const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const couponRoutes = require("./routes/couponRoutes");
const PORT = process.env.PORT || 5000;
const database = require("./config/database");

dotenv.config();
const app = express();

app.use(express.json());

database.connect();
app.use("/api/coupons", couponRoutes);
app.listen(PORT, () => {
    console.log(`Coupon App Server is running on port ${PORT}`);
});