import joi from 'joi';

const gamesSchema = joi.object(
    {
        name: joi.string().required(),
        image: joi.string().required(),
        stockTotal: joi.number().integer().greater(0).required(),
        categoryId: joi.number().integer().required(),
        pricePerDay: joi.number().integer().greater(0).required()
    }
);

export default gamesSchema;