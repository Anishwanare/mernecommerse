const mongoose = require("mongoose")
const {Schema} = mongoose

const OrderSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  order_data:{
    type:Object,
    require:true,
  }
});

const OrderModel = mongoose.model("order",OrderSchema)

module.exports = OrderModel
