import mongoose from "mongoose";
import config from "./index.js";

const dbUrl = config.dbUrl

mongoose.set('strictQuery', false)

const dbConnection = async () => {
    await mongoose.connect(dbUrl, {autoIndex: true})
}

export default dbConnection