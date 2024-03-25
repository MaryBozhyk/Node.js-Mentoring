import express, { NextFunction, Request, Response, Router } from "express";
import { ErrorMessage } from '../models/errors';
import {
    CheckoutCartResponseBody,
    CheckoutCartResponseData,
    EmptyUserCartResponseBody,
    EmptyUserCartResponseData,
    GetCartResponseBody,
    GetCartResponseData
} from '../models/response.body';
import { checkoutCart, emptyUserCart, getCartData, updateCart } from '../services/cart.service';
import { validateRequestBody } from '../validations/request-body-validation';
import { userValidation } from '../validations/validation';

export const cartRouter: Router = express.Router();

cartRouter.get('/', userValidation, async (req: Request<any>, res: Response<GetCartResponseBody>, next: NextFunction) => {
    try {
        const userId: string = req.query['x-user-id'] as string;
        const responseData: GetCartResponseData | null = await getCartData(userId);

        res.status(200)
            .send({
                "data": responseData,
                "error": null
            });
    } catch (error) {
        res.status(500)
            .send({
                "data": null,
                "error": {
                    "message": ErrorMessage.InternalServerError
                }
            });
    }
});

cartRouter.put('/', userValidation, validateRequestBody, async (req: Request<any>, res: Response<GetCartResponseBody>, next: NextFunction) => {
    try {
        const userId: string = req.query['x-user-id'] as string;
        const responseData: GetCartResponseData | null | undefined = await updateCart(userId, req.body);

        if (responseData) {
            res.status(200)
                .send({
                    "data": responseData,
                    "error": null
                });
        } else if (responseData === null) {
            res.status(404)
                .send({
                    "data": null,
                    "error": {
                        "message": ErrorMessage.NotFoundCart
                    }
                });
        } else {
            res.status(400)
                .send({
                    "data": null,
                    "error": {
                        "message": ErrorMessage.NotValidProducts
                    }
                });
        }
    } catch (error) {
        res.status(500)
            .send({
                "data": null,
                "error": {
                    "message": ErrorMessage.InternalServerError
                }
            });
    }
});

cartRouter.delete('/', userValidation, async (req: Request<any>, res: Response<EmptyUserCartResponseBody | null>, next: NextFunction) => {
    try {
        const userId: string = req.query['x-user-id'] as string;
        const responseData: EmptyUserCartResponseData | null = await emptyUserCart(userId);

        if (responseData) {
            res.status(200)
                .send({
                    "data": responseData,
                    "error": null
                });
        }
    } catch (error) {
        res.status(500)
            .send({
                "data": null,
                "error": {
                    "message": ErrorMessage.InternalServerError
                }
            });
    }
});

cartRouter.post('/checkout', userValidation, async (req: Request<any>, res: Response<CheckoutCartResponseBody>, next: NextFunction) => {
    try {
        const userId: string = req.query['x-user-id'] as string;
        const responseData: CheckoutCartResponseData | null = await checkoutCart(userId);

        if (responseData) {
            res.status(200)
                .send({
                    "data": responseData,
                    "error": null
                });
        }
    } catch (error) {
        res.status(500)
            .send({
                "data": null,
                "error": {
                    "message": ErrorMessage.InternalServerError
                }
            });
    }
});