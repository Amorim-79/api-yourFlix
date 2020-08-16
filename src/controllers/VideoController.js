const connection = require('../database/connection');

module.exports = {
    async create (req, res) {
        const { title, url ,category, } = req.body;
        const user_id = req.headers.user;

        const response = await connection('videos').insert({
            title,
            url,
            category,
            user_id,
        });

        return res.json(response);
    },

    async delete(req, res) {
        const { id } = req.params
        const user_id = req.headers.user

        const video = await connection('videos')
            .where('id', id)
            .select('user_id')
            .first()

        // VERIFICA SE O USUÁRIO É DONO DO VÍDEO
        if (video.user_id != user_id) {
            return res.status(401).json({ error: 'Operação não permitida.' })
        }

        await connection('videos').where('id', id).delete()

        return res.status(204).send()
    },

    async index(req, res) {
        const { category } = req.params
        const user_id = req.headers.user

        let videos

        // LISTA TODOS OS VÍDEOS DO USUÁRIO LOGADO
        if (category == '*') {
            videos = await connection('videos')
                .where('user_id', user_id)
                .select('*')

        } else {
            // LISTA APENAS OS VÍDEOS COM DETERMINADA CATEGORIA DO USUÁRIO LOGADO
            videos = await connection('videos')
                .where('user_id', user_id)
                .where('category', category)
                .select('*')
        }

        return res.json(videos)
    }
}