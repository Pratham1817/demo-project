import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().required(),
  category: Joi.string().optional(),
  stock: Joi.number().default(0),
  images: Joi.array().items(Joi.string()),
});
