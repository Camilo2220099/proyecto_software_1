const mongoose = require("mongoose");
require("dotenv").config();

const db = async () => {
  try {
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB FUNCIONANDO - Conectado a MongoDB Atlas`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;