const express = require("express");
const morgan = require("morgan");
// @ts-check
const app = express();
app.use(express.static("dist"));
// Middleware
app.use(express.json());

// Logger middleware
app.use(morgan(":method :url :body"));
// Here we add the data
let data = [
  {  
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
// Homepage route
app.get("/", (request, response) => {
  response.send("Welcome to the phonebook!");
});

// Get all persons
app.get("/persons", (request, response) => {
  response.json(data);
});

// Show info
app.get("/info", (request, response) => {
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
