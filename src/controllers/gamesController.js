import connection from "../database.js";

export async function getGames(req, res) {
    try {
        const { name } = req.query;

        let queryName = name;
        if (!queryName) {
            queryName = '';
        }

        const games = await connection.query(`
            SELECT 
                games.*, 
                categories.name AS "categoryName"
            FROM games
                JOIN categories ON games."categoryId"=categories.id
            WHERE LOWER(games.name) LIKE $1`
            , [queryName + '%']);

        res.status(200).send(games.rows);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function postGames(req, res) {
    try {
        const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

        const categoryExists = await connection.query(`
            SELECT * 
            FROM categories 
            WHERE id=$1`
            , [categoryId]);
        if (categoryExists.rowCount === 0) {
            return res.sendStatus(400);
        }

        const gameExists = await connection.query(`
            SELECT * 
            FROM games 
            WHERE name=$1`
            , [name]);
        if (gameExists.rowCount !== 0) {
            return res.sendStatus(409);
        }

        await connection.query(`
            INSERT INTO
                games(name, image, "stockTotal", "categoryId", "pricePerDay")
            VALUES($1,$2,$3,$4,$5)`
            , [name, image, parseInt(stockTotal), categoryId, parseInt(pricePerDay)]);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}