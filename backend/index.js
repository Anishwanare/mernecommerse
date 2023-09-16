const express = require("express");
const cors = require("cors");
const mongoDb = require("./db");
const { json } = require("body-parser");
const dotenv = require("dotenv");
dotenv.config(); 
const userRouter = require("./routes/userRouter")
const DisplayData = require("./routes/DisplayData");
const OrderData = require("./routes/OrderData")



const app = express();
app.use(express.json())
app.use(cors());
app.use(express.json({limit:"10mb"}))

const PORT = process.env.PORT || 8080;
mongoDb();

// userAPI
app.use("/api" , userRouter)
app.use("/api" , DisplayData)
app.use("/api" , OrderData)



app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log("Server is running at port: " + PORT);
});

