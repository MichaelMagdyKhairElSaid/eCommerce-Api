import Joi from "joi"

export const creatBrandSchema = Joi.object({
    name:Joi.string().min(2).max(30).required(),
    category:Joi.string().hex().length(24).required(),
    subCategory:Joi.string().hex().length(24).required()
})
export const updateBrandSchema = Joi.object({
    name:Joi.string().min(2).max(30).required(),
    id:Joi.string().hex().length(24).required(),
    category:Joi.string().hex().length(24).required(),
    subCategory:Joi.string().hex().length(24).required()
})
