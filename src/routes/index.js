const { Router } = require('express')

const usersRoutes = require('./users.routes')
const categoriasRoutes = require('./categorias.routes')
const pratosRoutes = require('./pratos.routes')
const ingredientesRoutes = require('./ingredientes.routes')
const pratoIngredientesRoutes = require('./Pratoingredientes.routes')

const routes = Router()
routes.use('/users', usersRoutes)
routes.use('/categorias', categoriasRoutes)
routes.use('/pratos', pratosRoutes)
routes.use('/ingredientes', ingredientesRoutes)
routes.use('/pratoingredientes', pratoIngredientesRoutes)


module.exports = routes