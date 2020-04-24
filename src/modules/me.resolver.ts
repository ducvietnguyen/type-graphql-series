import { Resolver, Ctx, Query } from "type-graphql";


import { User } from '../entity/User';

import { AppContext } from '../types/AppContext';


@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: AppContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined;
    }

    return User.findOne(ctx.req.session!.userId);
  }
}