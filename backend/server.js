const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const todosRoutes = require("./routes/todos.js");
const registerRoute = require("./routes/register.js");
const loginRoute = require("./routes/login.js");
const changePasswordRoute = require("./routes/changePassword.js");
const PORT = process.env.PORT | 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/todos", todosRoutes);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/change-password", changePasswordRoute);

app.listen(PORT, async (err) => {
  console.log(`Server listening on port ${PORT}`);
  await mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("Database connected successfully");
    }
  );

  if (err) {
    console.log("Error occured");
  }
});
