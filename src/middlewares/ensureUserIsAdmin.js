const knex = require('../database/knex');
const AppError = require('../utils/AppError');

async function ensureUserIsAdmin(request, response, next) {
    const { id: user_id } = request.user;

    try {
        const user = await knex("users").select("isAdmin").where({ id: user_id }).first();

        if (!user || !user.isAdmin) {
            throw new AppError("Access Denied: Unauthorized User", 401);
        }

        next();
    } catch (err) {
        next(err);
    }
}

module.exports = ensureUserIsAdmin;
