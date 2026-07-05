const express = require("express");
const cors = require("cors");

const app = express();
const contactRoutes = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactRoutes);

app.get("/", (req, res) => {
    console.log("Root endpoint accessed");
    res.json({ message: "Welcome to contact book application." });
});

app.use((req, res, next) => {
    console.log(`Request URL: ${req.originalUrl}`);
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;