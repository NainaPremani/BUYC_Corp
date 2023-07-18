require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const oemModel = require("../models/oemSpecs");
const oldCarModel = require("../models/oldCar");
const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
  upload_preset: "Instagaram_Media",
};


const uploadImage = (image) => {
  //imgage = > base64
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        // console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCar = async (req, res) => {
  console.log(req.body);
  try {
    const {
      imageUrl,
      userId,
      title,
      odometerDistance,
      totalAccident,
      color,
      totalBuyers,
      registrationPlace,
      mileage,
      price,
      manufacturer,
    } = req.body;
    if (!imageUrl || !userId)
      return res.status(400).send({ message: "Please Select Image" });
    if (
      !title ||
      !odometerDistance ||
      !totalAccident ||
      !color ||
      !totalBuyers ||
      !registrationPlace ||
      !mileage ||
      !manufacturer ||
      !price
    ) {
      return res.status(400).send({ message: "Please Fill all the Details" });
    }
    uploadImage(imageUrl)
      .then(async (url) => {
        let car = await oldCarModel({
          user: userId,
          img: url,
          title,
          odometerDistance,
          totalAccident,
          color,
          totalBuyers,
          registrationPlace,
          mileage,
          price,
          manufacturer,
        });
        car.save();
        return res.status(201).send({ message: "Car Added Succesfully" });
      })
      .catch((err) => {
        return res.status(500).send({ message: err.message });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

function convertPrice(priceStr) {
  const conversionFactors = {
    lakh: 100000,
    lac: 100000,
    lakhs: 100000,
    lacs: 100000,
    crore: 10000000,
    crores: 10000000,
    cr: 10000000,
    crs: 10000000,
  };

  const [value, unit] = priceStr.split(" ");
  const numericValue = parseInt(value);
  const conversionFactor = conversionFactors[unit];
  const price = numericValue * conversionFactor;

  return price;
}

const getAlloldCars = async (req, res) => {
  const { page = 1, limit = 9, color, priceOrder } = req.query;
  console.log(page, limit, color, priceOrder);
  let query = {};
  if (color) {
    query = { color: { $regex: color, $options: "i" } };
  }
  try {
    const allOldCarsCount = await oldCarModel.countDocuments(query);
    let allOldCars = await oldCarModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    // check If price has
    if (priceOrder && priceOrder === "asc") {
      allOldCars = allOldCars.sort((a, b) => {
        return convertPrice(a.price) - convertPrice(b.price);
      });
      return res
        .status(200)
        .send({ cars: allOldCars, totalPages: Math.ceil(allOldCarsCount / 9) });
    } else if (priceOrder && priceOrder === "desc") {
      allOldCars = allOldCars.sort((a, b) => {
        return convertPrice(b.price) - convertPrice(a.price);
      });
      return res
        .status(200)
        .send({ cars: allOldCars, totalPages: Math.ceil(countDocuments / 9) });
    }
    return res
      .status(200)
      .send({ cars: allOldCars, totalPages: Math.ceil(countDocuments / 9) });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

const deleteOldCar = async (req, res) => {
  let { id } = req.params;
  console.log(id);

  try {
    let deletedOldCar = await oldCarModel.deleteOne({ _id: id });
    return res
      .status(201)
      .send({ message: "Your Listed Cars Deleted Successfully" });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const UpdateOldCar = async (req, res) => {
  let {
    user,
    imageUrl,
    title,
    odometerDistance,
    totalAccident,
    color,
    totalBuyers,
    registrationPlace,
    mileage,
    price,
    isFileUploaded,
  } = req.body;
  const { id } = req.params;
  console.log(isFileUploaded);

  try {
    if (isFileUploaded) {
      uploadImage(imageUrl)
        .then(async (url) => {
          let car = await oldCarModel.findOneAndUpdate(
            { _id: id, user },
            {
              $set: {
                img: url,
                title: title,
                odometerDistance: odometerDistance,
                totalAccident: totalAccident,
                color: color,
                totalBuyers: totalBuyers,
                registrationPlace: registrationPlace,
                mileage: mileage,
                price: price,
              },
            },
            {
              new: true,
            }
          );
          return res.status(201).send({ message: "Car Added Succesfully" });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send({ message: err.message });
        });
    } else {
      let doc = await oldCarModel.findOneAndUpdate(
        { _id: id, user },
        {
          $set: {
            title: title,
            odometerDistance: odometerDistance,
            totalAccident: totalAccident,
            color: color,
            totalBuyers: totalBuyers,
            registrationPlace: registrationPlace,
            mileage: mileage,
            price: price,
          },
        },
        {
          new: true,
        }
      );
      // console.log(doc);

      return res
        .status(201)
        .send({ message: "Your Informtion Updated Successfully" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getSingleOldCar = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    let SingleOldCar = await oldCarModel.findOne({ _id: id });
    // console.log(doc);
    return res.status(200).send({ carData: SingleOldCar });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getOldCarSpecs = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    let OldCarSpecs = await oldCarModel.findById(id);
    console.log(OldCarSpecs);
    let OemCarSpecs = await oemModel.findOne({
      manufacturer: OldCarSpecs.manufacturer,
      name: OldCarSpecs.title,
    });
    console.log(OemCarSpecs);
    return res
      .status(200)
      .send({ oldCarData: OldCarSpecs, oemCarData: OemCarSpecs });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  uploadCar,
  getAlloldCars,
  deleteOldCar,
  UpdateOldCar,
  getSingleOldCar,
  getOldCarSpecs,
};
