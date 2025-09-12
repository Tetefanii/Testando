import {Router} from 'express'
import { pool } from './db.js'
const r = Router()

//GET http://localhost:3000/api/users
r.get('/db/health', async (_, res) => {
    try{
        const[rows] = await pool.query('SELECT 1 AS db_ok')
        res.json({ok: true, db: rows[0].db_ok})
    }catch{
        res.status(500).json({ok: false, db: 'down'})
    }
})

r.get('/users', async (_, res) =>{
    try{
        const[rows] = await pool.query(
            'SELECT id, name, email, created_at FROM users ORDER BY id DESC'
            )
            res.json(rows)
    }catch{
        res.status(500).json({error: 'Erro ao listar Usuários'})
    }
})
//POST https://localhost:3000/api/users
//Body Json{"name": "Pessoa". "email": "pessoa@teste.com"}
r.post('/users', async (req, res) => {
    const {name, email} = req.body
    if(!name || !email)
        return res.status(400).json({error: 'name e email obrigatórios'})
    
    try{
    const[ins] = await pool.query(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [name, email]
         )
    const[rows] = await pool.query(
        'SELECT id, name, email, created_at FROM users WHERE id = ?',
        [ins.insertId]
    )
    res.status(201).json(rows[0])
    }catch(err){
        if(err.code === 'ER_DUP_TRY'){
            return res.status(409).json({error:'email já cadastrado'})
        }
        res.status(500).json({error: 'Erro ao criar usuário'})
    }
})
//GET https://localhost:3000/api/pokemon/pikachu
r.get('/pokemon/:name', async (req, res) =>{
    const {name} =req.params
    try{
        const resp = await fetch(
            `https://pokeapi.co/api/v2/pokeomn/${encodeURIComponent(name)}`
        )
        if(!resp.ok){
            return res.status(404).json({error: 'Pokemon não encontrado'})
        }
        const data = await resp.json()
        res.json({
            id: data.id,
            name: data.name,
            types: data.types.map(t =>t.types.name)
        })
    } catch{
        res.status(500).json({error: 'Erro ao consultar uma API externa'})
    }
})

export default r