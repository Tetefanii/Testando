import express from 'express'
import db from './db.js'
import upload from './uploadConfig.js'
import fs from 'fs'

const r = express.Router()

//POST - http://localhost:3000/api/images
//body - form-data - key: image (file)
//Inserir Imagem
r.post('/images', upload.single('image'), async (req, res) => {
    try{
        const filepath=req.file.path
        await db.query('INSERT INTO images (img) VALUES (?)', [req.file.path])
        res.status(201).json({menssage: 'Imagem inserida com sucesso', img:filepath})
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//get - http://localhost:3000/api/images
//Retornar a lista com id e o caminho da imagem
//Listar Imagem
r.get('/images', async (req, res) => {
    try{
        const[rows]= await db.execute("SELECT * from images")
        res.status(200).json(rows)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//PUT - http://localhost:3000/api/images/1
//body - form-data - key: image (file)
//Atualizar Imagem
r.put('/images/:id', upload.single('image'), async (req, res) => {
    try{
        const {id} = req.params
        const newPath = req.file.path
        const[old] = await db.execute("SELECT * FROM images WHERE id=?",[id])
        if(old.length === 0) return res.status(404).json({error:"Imagem não encontrada"})
        const oldPath = old[0].img
        await db.execute("UPDATE images SET img = ? WHERE id =?",[newPath, id])
        fs.unlink(oldPath,(err)=>{
            if(err)console.warn("Erro ao Remover", err)
        })
        res.json({message:"Imagem atualizado com sucesso"})
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//DELETE - http://localhost:3000/api/images/1
//body - form-data - key: image (file)
//Delete Imagem
r.delete('/images/:id', async (req, res) => {
    try{
        const{id}=req.params
        const[rows] = await db.execute("SELECT * FROM images WHERE id= ?",[id])
        if(rows.length === 0) return res.status(404).json({error:"Imagem não encontrada"})
        const filePath = rows[0].img
        await db.execute("DELETE FROM images WHERE id= ?",[id])
        fs.unlink(filePath,(err)=>{
            if(err)console.warn("Erro ao Remover", err)
        })
        res.json({message:"Imagem excluída com sucesso"})
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

export default r