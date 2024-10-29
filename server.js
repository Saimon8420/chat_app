const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./helper/connectDB");
const path = require("path");
const seedRoutes = require('./routes/seedRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require("mongoose");

const app = express();

dotenv.config();

app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./front-end/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "./", "front-end", "dist", "index.html"))
    })
}

if (process.env.NODE_ENV === "local") {
    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true,
    }))
}
else {
    app.use(cors({
        credentials: true,
    }))
}

const port = process.env.PORT || 5000;

app.use('/api/users', userRoutes);
app.use('/api/seed', seedRoutes);

app.get("/", (req, res) => {
    res.send("Sever running");
})

app.listen(port, () => {
    connectDB();
    mongoose.set('debug', true);
    console.log(`Server is running at port ${port}`)
})