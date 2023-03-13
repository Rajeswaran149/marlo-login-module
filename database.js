const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectDatabase = async () => {
  const data = await mongoose.connect(process.env.MONGODB_URL);
  console.log(`MongoDb Connected with server ${data.connection.host}`);
};

module.exports = connectDatabase;
