
const Joi = require("joi");

const productCreate = Joi.object({
    price: Joi.number()
    .min(1)
    .required()
    .messages({
      "number.base": "Price must be a number",
      "number.min": "Price cannot be negative",
      "any.required": "Price is required",
    }),
     name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Crop name is required",
      "string.min": "Crop name must be at least 2 characters",
      "any.required": "Crop name is required",
    }),

    description: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "community is required",
      "string.min": "community must be at least 2 characters",
      "any.required": "community is required",
    }),
      phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 10 to 15 digits",
      "string.empty": "Phone number is required",
      "any.required": "Phone number is required",
    }),

});


const equipValidate =Joi.object({
    price: Joi.number()
    .min(1)
    .required()
    .messages({
      "number.base": "Price must be a number",
      "number.min": "Price cannot be negative",
      "any.required": "Price is required",
    }),

     name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Crop name is required",
      "string.min": "Crop name must be at least 2 characters",
      "any.required": "Crop name is required",
    }),

      description: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "community is required",
      "string.min": "community must be at least 2 characters",
      "any.required": "community is required",
    }),

     phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 10 to 15 digits",
      "string.empty": "Phone number is required",
      "any.required": "Phone number is required",
    }),

      image: Joi.string(),

})
module.exports = {
  equipValidate, 
  productCreate
};