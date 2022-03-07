import connection from "../database.js";

export async function getCategories(req, res) {
    try {
        let offset = '';
        let limit = '';

        if (req.query.offset) {
            offset = `OFFSET ${req.query.offset}`;
        }

        if (req.query.limit) {
            limit = `LIMIT ${req.query.limit}`;
        }

        const categories = await connection.query(`
            SELECT * 
            FROM categories
            ${offset}
            ${limit}
        `);

        res.send(categories.rows);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export async function postCategories(req, res) {
    try {
        const { name } = req.body;

        const alreadyTaken = await connection.query(`
            SELECT * 
            FROM categories 
            WHERE name=$1`
            , [name]);

        if (alreadyTaken.rowCount !== 0) {
            return res.sendStatus(409);
        }

        await connection.query(`
            INSERT INTO 
                categories(name)
            VALUES($1)`
            , [name]);

        res.sendStatus(201);
    }
    catch (error) {
        res.status(500).send(error);
    }

}