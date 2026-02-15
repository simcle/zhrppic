import { verifyToken } from "../utils/jwtHelper.js";

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) {
        return res.status(401).send('Invalid token')
    } 

    try {
        const decode = verifyToken(token)
        req.user = decode
        next()
    } catch (error) {
        res.status(401).send(error)
    }
    
}

export default authenticate