const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const couponRoutes = require("./routes/couponRoutes");
const PORT = process.env.PORT || 5000;
const database = require("./config/database");

dotenv.config();
const app = express();

// middleware
const corsOptions = {
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Authorization,Content-Type',
};
app.use(cors(corsOptions));
app.use(express.json());

// db connection
database.connect();

// routes
app.use("/api/coupons", couponRoutes);

app.listen(PORT, () => {
    console.log(`Coupon App Server is running on port ${PORT}`);
});