const express = require("express");
const requireLogin = require("../middlewares/auth.js");
const { CarModel } = require("../models/PostCarmodel.js");
const { UserModel } = require("../models/user.js");
const { Oem_model } = require("../models/oemSpecs.js");

const PostCarRoute = express.Router();

// Post a second-hand car with details

PostCarRoute.post("/addcar", requireLogin, async (req, res) => {
  const {
    images,
    Original_Paint,
    Number_of_accidents_reported,
    Number_of_previous_buyers,
    Registration_Place,
    KMs_on_Odometer,
    Major_Scratches,
    price,
    car_Manufacturer,
    model,
    year,
  } = req.body;

  if (
    !images ||
    !Original_Paint ||
    !Number_of_accidents_reported ||
    !Number_of_previous_buyers ||
    !Registration_Place ||
    !KMs_on_Odometer ||
    !Major_Scratches ||
    !price ||
    !car_Manufacturer ||
    !model ||
    !year
  ) {
    return res.status(422).json({ error: "Please Add All the fields...!" });
  }
  console.log("user", req.user);

  const addCar = new CarModel({
    images,
    Original_Paint,
    Number_of_accidents_reported,
    Number_of_previous_buyers,
    Registration_Place,
    KMs_on_Odometer,
    Major_Scratches,
    price,
    car_Manufacturer,
    model,
    year,
    postedBy: req.user._id,
    name: req.user.name,
  });

  addCar
    .save()
    .then((result) => {
      return res
        .status(200)
        .json({ post: result, msg: "Car Added Successfully...!" });
    })
    .catch((err) => console.log(err));
});

// Get the post of logged in user only
PostCarRoute.get("/getpost/:id", async (req, res) => {
  const id = req.params.id;
  UserModel.findById(id)
    .select("-password") // remove password
    .then((user) => {
      CarModel.find({ postedBy: id })
        .then((post, err) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.status(200).json({ user, post });
        })
        .catch((err) => {
          return res.status(422).json({ error: "User Not Found" });
        });
    });
});

// Get the post of logged in user for a selected company cars

PostCarRoute.get("/getfilterbycompany/:id", async (req, res) => {
  const id = req.params.id;
  const { company } = req.query;
  console.log(company);
  UserModel.findById(id)
    .select("-password") // remove password
    .then((user) => {
      CarModel.find({ $and: [{ postedBy: id }, { car_Manufacturer: company }] })
        .then((post, err) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.status(200).json({ user, post });
        })
        .catch((err) => {
          return res.status(422).json({ error: "User Not Found" });
        });
    });
});

// Get the post of logged in user for a selected color of cars
PostCarRoute.get("/getfilterbycolor/:id", async (req, res) => {
  const id = req.params.id;
  const { color } = req.query;

  UserModel.findById(id)
    .select("-password")
    .then((user) => {
      CarModel.find({ $and: [{ postedBy: id }, { Original_Paint: color }] })
        .then((post, err) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.status(200).json({ user, post });
        })
        .catch((err) => {
          return res.status(422).json({ error: "User Not Found" });
        });
    });
});

// Get the post of logged in user in a sorting order on based of price
PostCarRoute.get("/getsortbyprice/:id", async (req, res) => {
  const id = req.params.id;
  const { price } = req.query;
  console.log(price);

  if (price == "asc") {
    UserModel.findById(id)
      .select("-password")
      .then((user) => {
        CarModel.find({ postedBy: id })
          .sort({ price: 1 })
          .then((post, err) => {
            if (err) {
              return res.status(422).json({ error: err });
            }
            res.status(200).json({ user, post });
          })
          .catch((err) => {
            return res.status(422).json({ error: "User Not Found" });
          });
      });
  } else {
    UserModel.findById(id)
      .select("-password")
      .then((user) => {
        CarModel.find({ postedBy: id })
          .sort({ price: -1 })
          .then((post, err) => {
            if (err) {
              return res.status(422).json({ error: err });
            }
            res.status(200).json({ user, post });
          })
          .catch((err) => {
            return res.status(422).json({ error: "User Not Found" });
          });
      })
      .catch((err) => {
        return res.status(422).json({ error: "User Not Found" });
      });
  }
});

// Update data by dealers
PostCarRoute.patch("/updatedata/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  console.log(req.body);
  try {
    const data = await CarModel.findByIdAndUpdate({ _id: id }, payload);
    res.send({ message: "Product Details Updated!", oldProductDetais: data });
  } catch (err) {
    res.send({ message: "Something went Wrong!", error: err.message });
  }
});

// Delete Post //
PostCarRoute.delete("/deletepost/:postId", requireLogin, async (req, res) => {
  const id = req.params.postId;
  console.log(id);
  await CarModel.findById(id)
    .then((post, err) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy.toString() == req.user._id.toString()) {
        CarModel.findByIdAndDelete(id)
          .then((result) => {
            return res.json({ msg: "Successfully DELETED" });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return res
          .status(422)
          .json({ msg: "You are not Authorized to delete this Post" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// get all the post posted by all the dealers/users

PostCarRoute.get("/getdata", async (req, res) => {
  try {
    let data = await CarModel.find();
    res.status(200).send(data);
  } catch (error) {
    res.send(error.message);
  }
});

// Get all the post  for a selected company cars

PostCarRoute.get("/getalldatafilterbycompany/", async (req, res) => {
  const { company } = req.query;
  console.log(company);
  CarModel.find({ car_Manufacturer: company })
    .then((post, err) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      res.status(200).json({ post });
    })
    .catch((err) => {
      return res.status(422).json({ error: "User Not Found" });
    });
});

// Get all the post  for a selected color of cars

PostCarRoute.get("/getalldatafilterbycolor/", async (req, res) => {
  const { color } = req.query;
  console.log(color);
  CarModel.find({ Original_Paint: color })
    .then((post, err) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      res.status(200).json({ post });
    })
    .catch((err) => {
      return res.status(422).json({ error: "User Not Found" });
    });
});

// Get all the post in a sorted manner for price of car

PostCarRoute.get("/getalldatasortedbyprice/", async (req, res) => {
  const { price } = req.query;
  console.log(price);

  if (price == "asc") {
    CarModel.find()
      .sort({ price: 1 })
      .then((post, err) => {
        if (err) {
          return res.status(422).json({ error: err });
        }
        res.status(200).json({ post });
      })
      .catch((err) => {
        return res.status(422).json({ error: "User Not Found" });
      });
  } else {
    CarModel.find()
      .sort({ price: -1 })
      .then((post, err) => {
        if (err) {
          return res.status(422).json({ error: err });
        }
        res.status(200).json({ post });
      })
      .catch((err) => {
        return res.status(422).json({ error: "User Not Found" });
      });
  }
});

// get data of a particular post that is by id  for description purpose  //
PostCarRoute.get("/getdatabyid/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    let data = await CarModel.findById({ _id: postId });
    console.log(data);
    if (data) {
      try {
        let OemData = await Oem_model.find({
          $or: [
            { car_manufacturers: data.car_Manufacturer },
            { name_of_model: data.model },
          ],
        });
        return res.status(201).send({ data: data, Oem_data: OemData });
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = { PostCarRoute };
