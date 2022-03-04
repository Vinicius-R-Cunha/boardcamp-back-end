import { Router } from "express";
import { getRentals, postRentals, endRental, deleteRental } from "../controllers/rentalsController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import rentalsSchema from "../schemas/rentalsSchema.js";

const rentalsRouter = Router();
rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', validateSchemaMiddleware(rentalsSchema), postRentals);
rentalsRouter.post('/rentals/:id/return', endRental);
rentalsRouter.delete('/rentals/:id', deleteRental);

export default rentalsRouter;