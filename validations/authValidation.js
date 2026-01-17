import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  mobile: Joi.string().required(),
});

export const sendOtpSchema = Joi.object({
  mobile: Joi.string().required(),
});

export const verifyOtpSchema = Joi.object({
  mobile: Joi.string().required(),
  otp: Joi.string().required(),
});
