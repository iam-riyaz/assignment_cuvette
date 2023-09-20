import { Segments, celebrate, Joi } from "celebrate";

const mobileValidator = Joi.string()
  .length(10)
  .pattern(/\d{10}$/);

export const validation = celebrate({
  [Segments.BODY]: Joi.object({
    firstName:Joi.string().max(30).required("firstName is required"),
    lastName:Joi.string().max(30).required("lastName is required"),
    password:Joi.string().min(4).required("password is required"),
    email: Joi.string().email().required("email is required"),
    phone: mobileValidator.required("phone is required"),
  }),
});
