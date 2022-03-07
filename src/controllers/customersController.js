import connection from "../database.js";

export async function getCustomers(req, res) {
    try {
        let cpf = req.query.cpf;
        if (!cpf) {
            cpf = '';
        }

        let offset = '';
        let limit = '';
        let order = '';

        if (req.query.offset) {
            offset = `OFFSET ${req.query.offset}`;
        }

        if (req.query.limit) {
            limit = `LIMIT ${req.query.limit}`;
        }

        if (req.query.order) {
            order = `ORDER BY "${req.query.order}"`;
        }

        const customers = await connection.query(`
                SELECT * 
                FROM customers
                WHERE cpf LIKE $1
                ${offset}
                ${limit}
                ${order}`
            , [cpf + '%']);

        res.status(200).send(customers.rows);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getCustomer(req, res) {
    try {
        const { id } = req.params;

        const customer = await connection.query(`
            SELECT * 
            FROM customers
            WHERE id=$1`
            , [id]);

        if (customer.rowCount === 0) {
            return res.sendStatus(404);
        }

        res.status(200).send(customer.rows[0]);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function postCustomers(req, res) {
    try {
        const { name, phone, cpf, birthday } = req.body;

        const cpfExists = await connection.query(`
            SELECT * 
            FROM customers
            WHERE cpf=$1`
            , [cpf]);

        if (cpfExists.rowCount !== 0) {
            return res.sendStatus(409);
        }

        await connection.query(`
            INSERT INTO
                customers(name, phone, cpf, birthday)
            VALUES($1,$2,$3,$4)`
            , [name, phone, cpf, birthday]);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function editCustomers(req, res) {
    try {
        const { id } = req.params;
        const { name, phone, cpf, birthday } = req.body;

        const cpfExists = await connection.query(`
            SELECT * 
            FROM customers
            WHERE cpf=$1`
            , [cpf]);

        if (cpfExists.rowCount !== 0 && cpfExists.rows[0].id !== parseInt(id)) {
            return res.sendStatus(409);
        }

        await connection.query(`
            UPDATE customers
            SET name=$1,
                phone=$2,
                cpf=$3,
                birthday=$4
            WHERE id=$5`
            , [name, phone, cpf, birthday, id]);

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}