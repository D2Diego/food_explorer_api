const { Router } = require('express');

const SessionsController = require("../controllers/SessionsController");
const sessionsController = new SessionsController();

const sessionsRoutes = Router();

sessionsRoutes.get("/", sessionsController.create);

module.exports = sessionsRoutes;