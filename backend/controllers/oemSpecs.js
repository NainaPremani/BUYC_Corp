const oemModel = require("../models/oemSpecs");

const getAllOEMCars = async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  try {
    const allOemCarsCount = await oemModel.countDocuments();
    console.log(allOemCarsCount);
    const allOemCars = await oemModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);
    return res
      .status(200)
      .send({ cars: allOemCars, totalPages: Math.ceil(allOemCarsCount / 9) });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
const FilterOEMcars = async (req, res) => {
  const { name, manufacturer, year, page = 1 } = req.query;
  // console.log({ name, manufacturer, year });
  try {
    let query = {
      $and: [{ manufacturer: { $regex: manufacturer, $options: "i" } }],
    };

    if (name) {
      query.$and.push({ name: { $regex: name, $options: "i" } });
    }
    if (year) {
      query.$and.push({ year: parseInt(year) });
    }
    console.log(query);
    // const allOemCarsCount = await oemModel.countDocuments(query);
    const allOemCars = await oemModel
      .find(query)
      .skip((page - 1) * 9)
      .limit(9);
    // Search for matching cars

    return res.status(200).send({
      cars: allOemCars,
      // totalPages: Math.ceil(allOemCarsCount / 8),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

const getOEMCarModels = async (req, res) => {
  const { manufacturer } = req.query;
  if (!manufacturer) return res.status(200).send([]);
  try {
    const availabaleCarModels = await oemModel.find({ manufacturer });
    return res.status(200).send({ cars: availabaleCarModels });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = { getAllOEMCars, FilterOEMcars, getOEMCarModels };
