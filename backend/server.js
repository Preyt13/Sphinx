const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const questionRoutes = require("./routes/questionRoutes");
const scoreRoutes = require("./routes/scoreRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/questions", questionRoutes);
app.use("/api/score", scoreRoutes);

// connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/Sphinx")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// simple test route
app.get("/", (req, res) => {
  res.send("Backend is running!!!");
});



app.listen(5000, () => console.log("Server running on port 5000"));
