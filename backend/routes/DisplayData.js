const express = require("express");
const router = express.Router();

router.post("/foodData", async(req,res)=>{
  try {
    res.send([global.food_Category , global.food_item])
  } catch (error) {
    console.log(error);
    res.send("Server Error")
  }
})

module.exports= router
