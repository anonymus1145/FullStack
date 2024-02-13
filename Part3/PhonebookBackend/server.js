require("dotenv").config();

const ErrorHandler = require("./middlewares/ErrorHandler");
// server.js
const express = require("express");
//const morgan = require("morgan");
// @ts-check
const app = express();
app.use(express.static("dist"));
// Middleware
app.use(express.json());
//const mongoose = require("mongoose");
// Logger middleware
//app.use(morgan(":method :url :body"));

// Db module
const Person = require("./models/contact");

// Get all persons
app.get("/people", (request, response, next) => {
  Person.find({})
    .then((contacts) => {
      if (contacts) {
        response.json(contacts);
      } else {
        response.statusMessage = "Phonebook is empty";
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

// Show info
app.get("/people/info", (request, response, next) => {
  let count = 0;
  Person.find({}).then((contacts) => {
    if (contacts) {
      count = contacts.length;
      response.send(
        `Phonebook has info for ${count} people <br/><br/> ${new Date()}`,
      );
    } else {
      response.statusMessage = "Phonebook is empty";
      response.status(404).end();
    }
  })
    .catch(error => next(error));
});

// Get person
app.get("/people/:id", (request, response, next) => {
  const id = request.params.id;
  Person.find({ _id: id }).then(() => {
    if (id) {
      response.json(id);
      response.status(200).end();
    } else {
      response.statusMessage = "Person not found in the phonebook";
      response.status(404).end();
    }
  })
    .catch(error => next(error));
});

// Delete person
app.delete("/people/:id", (request, response, next) => {
  const id = request.params.id;
  if (id) {
    Person.deleteOne({ _id: id }).then(() => {
      response.send("Person was deleted from the phonebook!");
      response.status(204).end();
    })
      .catch(error => next(error));
  } else {
    response.statusMessage = "Person not found in the phonebook";
    response.status(404).end();
  }
});

// Add a new person -> POST
app.post("/people", (req, res, next) => {
  const body = req.body;
  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({
      error: "content missing",
    });
  }
  // Create a new person
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  // Check if the data is valid
  if (person.name.length < 3 || person.number.length < 8) {
    return res.status(400).json({
      error: "Content dosen't meet the requirements -> name must be 3+ characters and number must be 8+ characters",
    });
  }

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  })
    .catch((error) => next(error));
  //morgan.token("body", request => JSON.stringify(request.body));
});

// Update person
app.put("/people/:id", (request, response, next) => {
  console.log("Updating person " + request.body.name);
  const person = {
    name: request.body.name,
    number: request.body.number,
  };

  if(person.name === undefined || person.number === undefined) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  // Check if the data is valid
  if (person.name.length < 3 || person.number.length < 8) {
    return response.status(400).json({
      error: "Content dosen't meet the requirements -> name must be 3+ characters and number must be 8+ characters",
    });
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson);
      response.status(200).end();
      console.log("Updated person " + updatedPerson.name);
    })
    .catch(error => next(error));
});

// Custom error handler
app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
