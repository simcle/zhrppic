import cors from 'cors'
import config from '../config/index.js'

const corsMiddleware = cors({
    origin: config.cors,
    methods: ['*']
})

export default corsMiddleware