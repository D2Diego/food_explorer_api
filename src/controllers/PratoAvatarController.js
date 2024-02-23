const AppError = require("../utils/AppError")
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage")


class PratoAvatarController{
    async update(request, response){
        const { id: prato_id } = request.params;
        const avatarFilename = request.file.filename;

        const diskStorage = new DiskStorage();

        const prato = await knex("prato").where({ id: prato_id }).first();

        if(!prato){
            throw new AppError("Somente usuários autenticados podem mudar o avatar", 401)
        }

        if(prato.avatar){
            await diskStorage.deleteFile(prato.avatar);
        }

        const filename = await diskStorage.saveFile(avatarFilename)
        prato.avatar = filename

        await knex("prato").where({ id: prato_id }).update({
            path_image: prato.avatar,
        })

        return response.json(prato)

    }
}
module.exports = PratoAvatarController