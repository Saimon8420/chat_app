const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./helper/connectDB");
const path = require("path");
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
        origin: "http://localhost:5174",
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


app.get("/", (req, res) => {
    res.send("Sever running");
})

app.get("/hello", (req, res) => {
    res.send("Hello from server");
})

app.get("/test", (req, res) => {
    console.log("hello");
    res.json({ message: "Test route working" });
});

app.listen(port, () => {
    connectDB();
    mongoose.set('debug', true);
    console.log(`Server is running at port ${port}`)
})