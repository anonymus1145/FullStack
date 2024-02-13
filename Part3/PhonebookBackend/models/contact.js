require("dotenv").config();

// Here we add the data to the database in the server adn read it from the database
const mongoose = require("mongoose");

if (process.env.DB_PASSWORD.length<3) {
  console.log("give password as argument");
  process.exit(1);
}

mongoose.set("strictQuery",false);

mongoose.connect(process.env.CONNECTION_STRING)
  // eslint-disable-next-line no-unused-vars
  .then(result => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connecting to MongoDB:", error.message);
  });

const contactPersonSchema = new mongoose.Schema({
  // Add validation rules in the schema
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
  },
});

// Change the schema to JSON
contactPersonSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", contactPersonSchema);

