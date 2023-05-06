const mongoose = require('mongoose');

const {MONGODB_PORT,MONGODB_HOST, MONGODB_USERNA,MONGODB_PASSWORD,MONGODB_UTH, MONGO_DEFAULT, MONGODB } = process.env

const user = require("./mongomodels/user")


async function connectToDatabase() {
  try {
   await mongoose.connect(`mongodb://${MONGODB_USERNA}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/?${MONGODB_UTH}=${MONGO_DEFAULT}=${MONGODB}`);
   // await mongoose.connect(`mongodb://admin:admin@localhost:27017/?authMechanism=DEFAULT&authSource=restaurant`);
    console.log('Todo bien todo correcto y yo que me alegro',"database-mongoose connection successful");
  } catch (err) {
    console.error('Error connecting to database:', err);
  }
}


user()



module.exports = { connectToDatabase };


