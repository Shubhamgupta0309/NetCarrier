const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  capacity: { type: Number, required: true },
  driverLicense: { type: String, required: true },
  // Add more fields as needed
});

const Truck = mongoose.model('Truck', truckSchema);

module.exports = Truck;
