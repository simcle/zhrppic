import config from "./src/config/index.js";
import app from './src/app.js'
import dbConnection from "./src/config/database.js";

await dbConnection()

const PORT = config.port
app.listen(PORT, () => {
    console.log(`Server runing in ${process.env.NODE_ENV} mode on PORT: ${PORT}`)  
})