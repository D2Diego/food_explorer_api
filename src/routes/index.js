const { Router } = require('express')

const usersRoutes = require('./users.routes')
const categoriasRoutes = require('./categorias.routes')
const pratosRoutes = require('./pratos.routes')
const ingredientesRoutes = require('./ingredientes.routes')

const routes = Router()
routes.use('/users', usersRoutes)
routes.use('/categorias', categoriasRoutes)
routes.use('/pratos', pratosRoutes)
routes.use('/ingredientes', ingredientesRoutes)


module.exports = routes