import connection from "../database.js";

export async function getCategories(req, res) {
    try {
        const categories = await connection.query('SELECT * FROM categories');

        res.send(categories.rows);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export async function postCategories(req, res) {
    res.sendStatus(200);
}