const express = require('express')

const routes = express.Router()

const authMiddleware = require('./middlewares/auth')

const UserController = require('./controllers/UserController')
const VideoController = require('./controllers/VideoController')
const CategoryController = require('./controllers/CategoryController')

// ROTAS DE USUÁRIOS (REGISTRO, LOGIN)
routes.post('/register', UserController.register)
routes.post('/login', UserController.login)


// ROTAS DOS VÍDEOS (CRIAÇÃO, LISTAGEM, EXCLUSÃO)
routes.post('/videos', authMiddleware, VideoController.create)
routes.get('/videos/:category', authMiddleware, VideoController.index)
routes.delete('/videos/:id', authMiddleware, VideoController.delete)

// ROTA PARA LISTAR AS CATEGORIAS CRIADAS PELO USUÁRIO, SEM REPETIÇÃO
routes.get('/categorys', CategoryController.index)

module.exports = routes