const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
    try {
        if (process.env.NODE_ENV === "local") {
            await mongoose.connect(process.env.LOCALDB_URI);
            console.log("Local db is connected....")
        }
        else {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("Production db is connected....")
        }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDB;