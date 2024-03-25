import { NextFunction, Request, Response, Router } from "express";
import { ErrorMessage } from '../models/errors';
import { ProductEntity } from '../models/product.entity';
import { GetProductResponseBody, GetProductsResponseBody } from '../models/response.body';
import { getProductData, getProductsData } from '../services/product.service';
import { userValidation } from '../validations/validation';


export const productRouter: Router = Router();

productRouter.get('/', userValidation, async (req: Request<any>, res: Response<GetProductsResponseBody>, next: NextFunction) => {
    try {
        const responseData: ProductEntity[] = await getProductsData();

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

productRouter.get('/:productId', userValidation, async (req: Request<any>, res: Response<GetProductResponseBody>, next: NextFunction) => {
    try {
        const productId: string = req.params.productId;
        const responseData: ProductEntity = await getProductData(productId);

        if (!responseData) {
            res.status(404)
                .send({
                    "data": null,
                    "error": {
                        "message": ErrorMessage.NotFoundProductId
                    }
                });
        } else {
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