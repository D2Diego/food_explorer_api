const { Router } = require('express');

const PratosController = require('../controllers/PratosController');

const ensureAutheticated = require('../middlewares/ensureAutheticated');
const isAdmin = require('../middlewares/isAdmin');

const pratosRoutes = Router();

const pratosController = new PratosController();

pratosRoutes.post('/',ensureAutheticated, isAdmin, pratosController.create);
pratosRoutes.put('/:id',ensureAutheticated, isAdmin, pratosController.updated);
pratosRoutes.get('/:id',ensureAutheticated, pratosController.read);
pratosRoutes.delete('/:id',ensureAutheticated, isAdmin, pratosController.delete);

module.exports = pratosRoutes;