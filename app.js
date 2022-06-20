const express = require("express");
const connectDB = require("./DB/database");

const accountRoutes = require("./api/accounts/accounts.routes");
const app = express();
const PORT = 8000;
app.use(express.json());
app.use("/api/accounts", accountRoutes);

connectDB();
app.listen(PORT);
