const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_TOKEN = process.env.SECRET_KEY;

// Register Route
const userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).send({ message: "Please Enter All Credential" });

  const exsist = await userModel.findOne({ email });
  if (exsist)
    return res
      .status(409)
      .send({ message: "User Already exist" });

  const hash = bcrypt.hashSync(password, 10);
  console.log("hash-",hash);
  const user = await userModel({ name, email, password: hash });
  user.save();

  return res
    .status(201)
    .send({ user, message: "Signup Successfull" });
};

//Login Route 
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  console.log("email",email,"password-",password);

  if (!email || !password) {
    return res.status(400).send({ message: "Please Enter All Credentials" });
  }
  let User = await userModel.findOne({ email });
  if (!User)
    return res
      .status(404)
      .send({ message: "Invalid Details! User Not Found " });
  
  try {
    const match = bcrypt.compareSync(password, User.password);
    console.log("match",match);
    if (match) {
      //login
      const token = jwt.sign(
        {
          _id: User._id,
          name: User.name,
          email: User.email,
          password: User.password,
        },
        SECRET_TOKEN,
        {
          expiresIn: "7 days",
        }
      );
      return res
        .status(200)
        .send({ message: "Login Successfull", token, id: User._id });
    } else {
      return res.status(401).send({ message: "Password is Incorrect" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err});
  }
};

module.exports = { userSignup, userLogin };
