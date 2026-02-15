import dotenv from 'dotenv'
import path from 'node:path'

const NODE_ENV = process.env.NODE_ENV || 'development'; // Default ke development jika tidak didefinisikan
const envFile = NODE_ENV === 'production' ? '.env.production' : '.env.development';

console.log(envFile)
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const config = {

    port: process.env.PORT,
    cors: process.env.CORS_ORIGIN,
    dbUrl: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET
}

export default config