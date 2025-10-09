import db from '../db.js';
import bcrypt from 'bcrypt';
import {createToken, denyToken} from '../services/tokenService.js';

const sanitizeUser = (u) => ({
    id: u.id, name: u.name, email: u.email //remove dados sensíveis como senha
})
export const resister = async (req, res) => {
    const {name,email,password}= req.body
    if(!name || !email || !password){
        return res.status(400).json({error: 'Envie name, email e password'})
    }
    try {
        const [exists]=await db.query('SELECT id from users WHERE email =?', [email])
        if (exists.lenght) return res.status(409).json({error: 'email já resgistrado!'})
        const hashed = await bcrypt.hash(password, 10)
        const  [result] = await db.query(
            'INSERT INTO users (name, email, password) VALUES (?,?,?)',
            [name, email, hashed]
        )
        return res.status(201).json({id: result.insertId, name, email})
    }catch(err){
        return res.status(500).json({error:'Erro ao registar usuário'})
    }
}

