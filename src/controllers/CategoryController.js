const connection = require('../database/connection')

module.exports = {
    // LISTA TODAS AS CATEGORIAS DOS VIDEOS, SEM REPETIÇÃO
    async index (req, res) {
        const user_id = req.headers.user

        const category = await connection('categorys')
            .where('user_id', user_id)
            .select('category')
            .distinct()

        res.json(category)
    }
}