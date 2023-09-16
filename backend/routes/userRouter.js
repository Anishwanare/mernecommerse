const express = require("express");
const router = express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const secToken = "myNameIsAnishWanareIAmLearningMernStackFromEndToEnd"

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  //bcrypt
  const salt = await bcrypt.genSalt(10);
  const genPassword = await bcrypt.hash(password, salt);
  // bcrypt end
  userModel
    .findOne({ email: email })
    .then((result) => {
      if (!result) {
        try {
          const userData = userModel({ email: email, password: genPassword });
          userData.save();
          res.send({ message: "Account Created Successfully", alert: true });
        } catch (error) {
          console.log(error);
        }
      } else {
        // console.log("Email is already register");
        res.send({ message: "Email already registered", alert: false });
      }
    })
    .catch((err) => console.log(err));
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  await userModel
    .findOne({ email: email })
    .then(async(result) => {
      if (!result) {
        res.send({ message:` Login failed! Please check your credentials`, alert: false });
      } else {
        const pwdCompare = await bcrypt.compare(password, result.password);
        if (pwdCompare) {
          // token part ``````````````````````````````````````
          const data = {
            user: {
              id: result._id,
            },
          };
          const authToken = jwt.sign(data, secToken);
          // console.log(authToken);
          // token end ``````````````````````````````````````
          res.send({
            message: "Login Successfully",
            alert: true,
            authToken: authToken,
          });
        } else {
          res.send({ message: "Invalid email or Password", alert: false });
        }
      }
    })
    .catch((Err) => {
      res.send({ message: "An Unexpected error Occurred", alert: false });
      res.status(404).json({ message: `An Unexpected error occure ${Err}` });
    });
});

module.exports = router;
