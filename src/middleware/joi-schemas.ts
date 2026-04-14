import Joi from "joi"


export const userSchema = Joi.object({
    full_name: Joi.string()
        .min(3)
        .max(50)
        .alphanum(),
       
    
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: true } })
        .max(100),
        
    
    password: Joi.string()
        .min(8)
        .max(100)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        }),

role: Joi.string()
    .valid( 'User','Admin')
    .default('User')
    .messages({
      'any.only': 'Role must be one of USER,ADMIN',
    }),

})



// Deposit
export const depositSchema = Joi.object({
  amount: Joi.number()
    .positive()
    .required()
});


// Withdraw
export const withdrawSchema = Joi.object({
  amount: Joi.number()
    .positive()
    .required()
});


// Transfer
export const transferSchema = Joi.object({
  amount: Joi.number()
    .positive()
    .required(),

    receivingEmail:Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: true } })
        .max(100),
});