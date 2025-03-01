const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  breed: { type: String },
  ageMonths: { type: Number },
  picture: { type: String }, // URL da foto
  vaccinated: { type: Boolean, default: false },
  safePoints: [{ latitude: Number, longitude: Number }],
  safeDistance: { type: Number, default: 30 }, // Em metros
});

module.exports = mongoose.model("Pet", petSchema);
