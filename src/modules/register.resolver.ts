import { Resolver, Mutation, Arg } from "type-graphql";
import bcrypt from 'bcryptjs';

import { User } from '../entity/User';
import { RegisterInput } from "./user/register/registerInput";


@Resolver(User)
export class RegisterResolver {

  @Mutation(() => User)
  async register(
    @Arg('data') { firstName, lastName, email, password }: RegisterInput): Promise<User> {

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create(
      {
        firstName, lastName, email, password: hashedPassword
      }
    ).save();
    return user;

  }
}
