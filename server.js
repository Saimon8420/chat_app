const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./helper/connectDB");
const path = require("path");

const app = express();

dotenv.config();

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

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./front-end/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "./", "front-end", "dist", "index.html"))
    })
}

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Sever running");
})

app.listen(port, () => {
    connectDB();
    console.log(`Server is running at port ${port}`)
})