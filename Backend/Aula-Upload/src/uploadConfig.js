import multer from 'multer'
import path from 'path'
import fs from 'fs'

const uploadDir = 'uploads'
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
}
const storage = multer.diskStorage({
    destination: (req, file, cd)=>{
        cb(null, uploadDir)
    },
    filename: (req, file, cd)=>{
        const ext = path.extname(file.originalname)
        const name = `${Date.now()}-${Math.floor(Math.random()*1E9)}${ext}`
        cb(null, name)
    }
})

const fileFilter = (req, file, cd)=>{
    const allowed = ['image/jpeg', 'image/jpg', 'image/png']
    allowed.includes(file.mimetype) ? cb(null, true) : cd(new Error('Arquivo Inválido'))
}

const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 2*1024*1024} //2MB
})

export default upload