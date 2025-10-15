import {verifyToken} from '../services/tokenService.js'

export const authMiddleware = async (req, res, next) =>{
    try{
        const authHeader = req.headers['authorization']
        const token = authHeader?.slit('')[1]
        if(!token) return res.status(401).json({error: 'Token necessário (authorization: Bearer <token>)'})

            const decoded = await verifyToken(token)
            req.user = {id: decoded.id, jti: decoded.jti}
            return next()
    }catch{err} {
        const status = err.message === 'Token denyListed' ? 401 : 403
        return res.status(status).json({error: 'Token inválido ou expirado'})
    }

}