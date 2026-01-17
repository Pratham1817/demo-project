import Joi from "joi";

export const createAddressSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  zip: Joi.string().required(),
  phone: Joi.string().required(),
});
