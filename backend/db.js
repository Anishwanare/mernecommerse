const mongoose = require("mongoose");

const MONGOOSE_URL =
  process.env.MONGOOSE_URL ||
  "mongodb+srv://tummyyep:anish@tummyyep.ke0uahn.mongodb.net/tummyyepmern?retryWrites=true&w=majority";

const mongoDb = () => {
  mongoose
    .connect(MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
      console.log("Connected to database");
      //   `````````````` HOW WE CAN *READ* DATA FROM DB````````````` ONE OF THE THING OF crud ie. Read
      const foodItem = await mongoose.connection.collection("food_item"); // using this we are able to acces data direct from DB
      foodItem
        .find({})
        .toArray()
        .then((result) => {
          if (result) {
            // console.log(result) 
            global.food_item = result;
          } else {
            console.log("Food item Data is not coming from the DB");
          }
        })
        .catch((err) => console.log(err));

      // food Category
      const foodCategory = await mongoose.connection.collection(
        "food-category"
      ); //food Category
      foodCategory
        .find({})
        .toArray()
        .then((result) => {
          if (result) global.food_Category = result;
          else console.log("Food item Data is not coming from the DB");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(`${err}`);
    });
  // ````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
};

module.exports = mongoDb;
