const express = require("express");
const router = express.Router();
const UserOrder = require("../models/Orders");


router.post("/orderData", async (req, res) => {
  const { order_data, email, order_date } = req.body;
  await order_data.splice(0, 0, { Order_date: order_date });

  try {
    let existingUserOrders = await UserOrder.findOne({ email: email });
    if (!existingUserOrders) {
      const newUserOrders = new UserOrder({
        email: email,
        order_data: [order_data],
      });
      await newUserOrders.save();
      res.send({ message: "Order placed" });
    } else {
      existingUserOrders.order_data.push(order_data);
      await existingUserOrders.save();
      res.send({ message: "New Order placed" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
});

router.post("/myOrderData", async (req, res) => {
  try {
    const { email } = req.body;
    const myData = await UserOrder.findOne({ email: email });
    if (myData) {
      res.send([myData])
    } else {
      res.send({ message: "No order data found" });
    }
  } catch (error) {
    console.error("Error fetching order data:", error);
    res.status(500).send({ message: "Server error" });
  }
});



module.exports = router;