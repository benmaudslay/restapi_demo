require("./db/connection");
const express = require("express");

const port = process.env.PORT || 5000;
// init instance of express
const app = express();

// routes/endpoints
app.get("/health", (req, res) => {
  res.send({ message: "API is working correctly" });
});

app.get("/user", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send(allUsers);
  } catch (error) {
    res.send(error);
  }
});

app.post("/user", async (req, res) => {
  try {
    const user = new User(req.body);
    const returnedValue = await user.save();
    res.send(`Successfully added ${returnedValue.name}`);
  } catch (error) {
    res.send(error);
  }
});

// server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
