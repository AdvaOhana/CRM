import Joi from "joi";

export const userSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name should have at least 2 characters',
            'string.max': 'Name should have at most 50 characters',
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Email must be a valid email address',
        }),

    phone: Joi.string()
        .pattern(/^\d{3}-\d{7}$/)
        .required()
        .messages({
            'string.empty': 'Phone is required',
            'string.pattern.base': 'Phone must be in the format 123-4567890',
        }),

    password: Joi.string()
        .min(8)
        .max(20)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).+$'))
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters',
            'string.max': 'Password must be at most 20 characters',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one special character (!@#$%^&*)',
        }),
    role: Joi.string()
        .valid("admin", "employee")
        .required()
        .messages({
            'any.only': 'Role must be either admin or employee',
            'string.empty': 'Role is required'
        })
});

export const clientSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name should have at least 2 characters',
            'string.max': 'Name should have at most 50 characters',
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Email must be a valid email address',
        }),

    phone: Joi.string()
        .pattern(/^\d{3}-\d{7}$/)
        .required()
        .messages({
            'string.empty': 'Phone is required',
            'string.pattern.base': 'Phone must be in the format 123-4567890',
        }),

    description: Joi.string()
        .max(500)
        .allow('')
        .messages({
            'string.max': 'Description must be at most 500 characters',
        }),
});

export const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Email must be a valid email address',
        }),

    password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters',
            'string.max': 'Password must be at most 20 characters',
        }),
});

