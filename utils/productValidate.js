
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
      "string.empty": " name is required",
      "string.min": "name must be at least 2 characters",
      "any.required": "name is required",
    }),

    description: Joi.string()
    .min(2)
    .max(1000)
    .required()
    .messages({
      "string.empty": "description is required",
      "string.min": "description must be at least 2 characters",
      "any.required": "description is required",
    }),
    category: Joi.string().min(2).max(100).required().messages({
     "string.empty": "cateogory is required",
      "string.min": "category must be at least 2 characters",
      "any.required": "category is required",
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
      "string.empty": "machine name is required",
      "string.min": "machine name must be at least 2 characters",
      "any.required": "machine name is required",
    }),

     category: Joi.string()
    .min(2)
    .max(1000)
    .required()
    .messages({
      "string.empty": "category name is required",
      "string.min": "category  must be at least 2 characters",
      "any.required": "category name is required",
    }),

      description: Joi.string()
    .min(2)
    .max(1000)
    .required()
    .messages({
      "string.empty": "description is required",
      "string.min": "description must be at least 2 characters",
      "any.required": "description is required",
    }),
     
     phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 10 to 15 digits",
      "string.empty": "Phone number is required",
    //   "any.required": "Phone number is required",
    }),

      image: Joi.string(),

})
module.exports = {
  equipValidate, 
  productCreate
};