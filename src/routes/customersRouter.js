import { Router } from "express";
import { getCustomers, getCustomer, postCustomers, editCustomers } from "../controllers/customersController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import customersSchema from "../schemas/customersSchema.js";


const customersRouter = Router();
customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomer);
customersRouter.post('/customers', validateSchemaMiddleware(customersSchema), postCustomers);
customersRouter.put('/customers/:id', validateSchemaMiddleware(customersSchema), editCustomers);

export default customersRouter;