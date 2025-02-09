// import express module
import express from "express";

// express app
const app = express();

// port variable
const PORT = process.env.PORT || 3000;

// users array api
const users = [
  { id: 1, username: "Babucarr Badjie", displayName: "Bax" },
  { id: 2, username: "Kristy Wang", displayName: "Kri" },
  { id: 3, username: "Alieu Jagne", displayName: "Jagne" },
  { id: 4, username: "Ebrima Sallah", displayName: "Sallah" },
  { id: 5, username: "Muhammed Badjie", displayName: "Med" },
];

//part 1:  get request (http verb, get)
app.get("/", (request, response) => {
  response.status(201).send("Hello, World!");
});

app.get("/api/users", (request, response) => {
  //   response.send(users);

  // part 3: Query params
  //   console.log(request.query);

  const {
    query: { filter, value },
  } = request;

  //   when filter and value are undefined
  if (filter && value) {
    return response.send(users.filter((user) => user[filter].includes(value)));
  } else {
    return response.send(users);
  }
});

// part 2: Route params
app.get("/api/users/:id", (request, response) => {
  console.log(request.params);

  const parsedId = parseInt(request.params.id);
  if (isNaN(parsedId))
    return response.status(400).send("Bad Request. Invalid ID");

  const findUser = users.find((user) => user.id === parsedId);

  if (findUser) {
    return response.send(findUser);
  } else {
    return response.status(400).send("Cannot find user");
  }
});

// part 4: post request
app.post("/api/users", (request, response) => {});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
