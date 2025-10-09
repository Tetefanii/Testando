import { Router } from 'express'
import { register, login, forgotPassword, logout } from
'./controllers/authControllers.js'
import { profile, updateMe, deleteUser } from
'./controllers/userControllers.js'
import { authMiddleware } from './middlewares/authMiddleware.js'

const router = Router()
// Público
router.post('/auth/register', register)
router.post('/auth/login', login)
router.post('/auth/forgot-password', forgotPassword)
// Privado
router.post('/auth/logout', authMiddleware, logout)
router.get('/users/profile', authMiddleware, profile)
router.put('/users/me', authMiddleware, updateMe)
router.delete('/users/:id', authMiddleware, deleteUser)

export default router