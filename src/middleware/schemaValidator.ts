import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const schemaValidator = (schema:ObjectSchema, options = {}) => (req:Request, res:Response, next:NextFunction) => {
    console.log('Validating:', req.body);

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details });
    }
    
    req.body = value;
    next();
};