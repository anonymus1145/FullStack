require("dotenv").config();
// server.js
const express = require("express");
const morgan = require("morgan");
// @ts-check
const app = express();
app.use(express.static("dist"));
// Middleware
app.use(express.json());

// Logger middleware
app.use(morgan(":method :url :body"));

// Db module
const Person = require("./models/contact");

// Get all persons
app.get("api/persons", (request, response) => {
  Person.find({}).then(contacts => {
    response.json(contacts);
  });
});

// Show info
app.get("api/info", (request, response) => {
  const info = `Phonebook has info for ${data.length} people <br/><br/> ${new Date()}`;
  response.send(info);
});

// Get person
app.get("/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = data.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.statusMessage = "Person not found in the phonebook";
    response.status(404).end();
  }
});

// Delete person
app.delete("/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  data = data.filter(note => note.id !== id);

  response.statusMessage = "Person deleted from the phonebook";
  response.status(204).end();
});

// Receive a new person
app.post("/persons", (req, res) => {
  const body = req.body;
  if (!body.name) {
    return res.status(400).json({
      error: "name missing"
    });
  }
  if (!body.number) {
    return res.status(400).json({
      error: "number missing"
    });
  }
  const person = data.find(person => person.name === body.name);
  if (person) {
    return res.status(400).json({
      error: "The contact already exists"
    });
  }
  data = data.concat(body);
  res.status(201).json(body);
  morgan.token("body", request => JSON.stringify(request.body));
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
