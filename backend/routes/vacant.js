const express = require('express');
const router = express.Router();
const V1 = require('../models/vacantv1');

router.post('/', async (req, res) => {
  try {
    console.log("data is", req.body);
    const existingData = await V1.find(req.body);
    console.log(existingData);

    if (existingData.length > 0) {
      // If data exists, delete existing data
      const deletedData = await V1.findOneAndDelete(req.body);
      console.log("Data deleted:", deletedData);
    }

    if (Object.keys(req.body).length > 0) {
      // If new data is provided, insert it
      const newDocument = new V1(req.body);
      const savedDocument = await newDocument.save();
      console.log("New document created:", savedDocument);
      res.json({ message: "New document created", data: savedDocument });
    } else {
      console.log("No new data provided.");
      res.json({ message: "No new data provided" });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
