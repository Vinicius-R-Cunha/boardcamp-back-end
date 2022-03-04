export async function getRentals(req, res) {
    try {
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}
export async function postRentals(req, res) {
    try {
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}
export async function endRental(req, res) {
    try {
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}
export async function deleteRental(req, res) {
    try {
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}