const { Router } = require('express')

const usersRoutes = require('./users.routes')
const categoriasRoutes = require('./categorias.routes')

const routes = Router()
routes.use('/users', usersRoutes)
routes.use('/categorias', categoriasRoutes)


module.exports = routes