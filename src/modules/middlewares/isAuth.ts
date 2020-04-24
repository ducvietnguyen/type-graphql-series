import { MiddlewareFn } from "type-graphql";
import { AppContext } from "src/types/AppContext";

export const isAuth: MiddlewareFn<AppContext> = async ({ context }, next) => {

    if (!context.req.session!.userId) {
        throw Error('not authenticated!');
    }
    return next();
};