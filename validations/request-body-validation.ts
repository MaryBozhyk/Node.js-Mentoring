import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema } from 'joi';
import { ErrorMessage } from '../models/errors';
import { GetCartResponseBody } from '../models/response.body';

const schema: ObjectSchema<any> = Joi.object({
    productId: Joi.string().guid(),
    count: Joi.number().positive().allow(0)
});

export async function validateRequestBody(req: Request<any>, res: Response<GetCartResponseBody>, next: NextFunction) {
    try {
        await schema.validateAsync(req.body);

        next();
    } catch {
        res
            .status(400)
            .send({
                "data": null,
                "error": {
                    "message": ErrorMessage.NotValidProducts
                }
            });

        return;
    }
}