const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class UserAvatarController {
    async update(request, response) {
        const user_id = request.user.id;
        const avatarFilename = request.file.filename;

        const diskStorage = new DiskStorage();

        const user = await knex("users")
            .where({ id: user_id }).first();

        if (!user) {
            throw new AppError("Somente usuários autenticados podem mudar o avatar", 401);
        }

        if (user.avatar) {
            await DiskStorage.deleteFile(user.avatar);
        }

        const filename = await DiskStorage.saveFile(avatarFilename);

        await knex("users")
            .where({ id: user_id })
            .update({ avatar: filename });

        return response.status(201).json({ id: user_id, avatar: filename });
    }
}

module.exports = UserAvatarController;
