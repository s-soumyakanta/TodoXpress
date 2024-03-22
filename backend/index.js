const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const routes = require("./src/routes/TodoRoutes")
const PORT = process.env.PORT || 5000;

//middleware
const corsOptions = {
  origin: 'https://todoxpress.vercel.app',
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected..."))
  .catch((err) => console.log("Error in Mongoose Connect, " + err.message));


app.use("/api",routes)

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
