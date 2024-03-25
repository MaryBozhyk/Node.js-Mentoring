import { NextFunction, Request, Response } from 'express';
import { ErrorMessage } from '../models/errors';
import { GetCartResponseBody } from '../models/response.body';
import { UserEntity } from '../models/user.entity';
import { getAdmin, getUserById } from '../repositories/user.repository';

export async function userValidation(req: Request<any>, res: Response<GetCartResponseBody>, next: NextFunction) {
    const userId: string = req.query['x-user-id'] as string;

    if (!userId) {
        res
            .status(403)
            .send({
                "data": null,
                "error": {
                    "message": ErrorMessage.Forbidden
                }
            });
        return;
    }

    const adminId: string = (await getAdmin()).id;
    const user: UserEntity = await getUserById(userId);

    if (!user && userId !== adminId) {
        res
            .status(401)
            .send({
                data: null,
                error: {
                    "message": ErrorMessage.Unauthorized
                }
            });
        return;
    }

    next();
}