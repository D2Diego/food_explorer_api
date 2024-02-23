const { Router } = require('express');
const multer = require("multer")
const uploadConfig  = require('../config/upload')

const PratosController = require('../controllers/PratosController');

const ensureAutheticated = require('../middlewares/ensureAutheticated');
const isAdmin = require('../middlewares/isAdmin');

const pratosRoutes = Router();
const upload = multer(uploadConfig.MULTER)

const pratosController = new PratosController();

pratosRoutes.post('/',ensureAutheticated, isAdmin, pratosController.create);
pratosRoutes.put('/:id',ensureAutheticated, isAdmin, pratosController.updated);
pratosRoutes.get('/:id',ensureAutheticated, pratosController.read);
pratosRoutes.delete('/:id',ensureAutheticated, isAdmin, pratosController.delete);
pratosRoutes.patch('/avatar',ensureAutheticated, isAdmin, upload.single("avatar"),
(request, response) => {console.log(request.file.filename); 
    response.json();

});

module.exports = pratosRoutes;