import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from 'bcryptjs';

import { User } from '../entity/User';
import { LoginInput } from "./user/login/loginInput";
import { AppContext } from "../types/AppContext";


@Resolver()
export class LoginResolver {

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('data') { email, password }: LoginInput,
    @Ctx() ctx: AppContext): Promise<User | null> {


    const user = await User.findOne({ where: { email }});

    if (!user) {
      return null;
    }

    const valid = bcrypt.compare(password, user.password);
    if(!valid)
    {
      return null;
    }
    
    ctx.req.session!.userId = user.id;

    return user;

  }
}
