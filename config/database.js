const mongoose = require("mongoose");

exports.connect = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
        })
        .then(() => {
            console.log("CouponDB is connected successfully !");
        })
        .catch((err) => {
            console.log("CouponDB is not connected");
            // console.error(err);
            process.exit(1);
        });
};