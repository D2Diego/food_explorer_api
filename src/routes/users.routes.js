const { Router } = require('express')

const UsersController = require('../controllers/UsersController')
const ensureAutheticated = require('../middlewares/ensureAutheticated')

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.get('/', usersController.create)
usersRoutes.put('/',ensureAutheticated, usersController.update)

module.exports = usersRoutes;