const { Router } = require('express');
const multer = require("multer")
const uploadConfig  = require('../config/upload')

const PratosController = require('../controllers/PratosController');
const PratoAvatarController = require('../controllers/PratoAvatarController');

const ensureAutheticated = require('../middlewares/ensureAutheticated');
const isAdmin = require('../middlewares/isAdmin');

const pratosRoutes = Router();
const upload = multer(uploadConfig.MULTER)

const pratosController = new PratosController();
const pratoAvatarController = new PratoAvatarController();

pratosRoutes.post('/',ensureAutheticated, isAdmin, pratosController.create);
pratosRoutes.put('/:id',ensureAutheticated, isAdmin, pratosController.updated);
pratosRoutes.get('/:id',ensureAutheticated, pratosController.read);
pratosRoutes.delete('/:id',ensureAutheticated, isAdmin, pratosController.delete);
pratosRoutes.patch('/:id/avatar',ensureAutheticated, isAdmin, upload.single("avatar"), pratoAvatarController.update );

module.exports = pratosRoutes;