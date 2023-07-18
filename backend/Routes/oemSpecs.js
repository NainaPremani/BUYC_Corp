const express = require("express");
const { Oem_model } = require("../models/oemSpecs.js");

const OemRouter = express.Router();

OemRouter.post("/postoem", async (req, res) => {
  const payload = req.body;
  console.log(payload);
  const Oem = new Oem_model(payload);
  Oem.save()
    .then((result) => {
      return res
        .status(200)
        .json({ post: result, msg: "OEM's Added Successfully...!" });
    })
    .catch((err) => console.log(err));
});

module.exports = { OemRouter };
