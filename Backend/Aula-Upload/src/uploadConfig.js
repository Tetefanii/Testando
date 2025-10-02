import multer from 'multer'
import path from 'path'
import fs from 'fs'

const uploadDir = 'uploads'
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
}

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, uploadDir)
    },
    filename: (req, file, cb)=>{
        const ext = path.extname(file.originalname)
        const name = `${Date.now()}-${Math.floor(Math.random()*1E9)}${ext}`
        cb(null, name)
    }
})

const fileFilter = (req, file, cb)=>{
    const allowed = ['image/jpeg', 'image/jpg', 'image/png']
    if (allowed.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Arquivo Inválido'))
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 2*1024*1024} // 2MB
})

export default upload