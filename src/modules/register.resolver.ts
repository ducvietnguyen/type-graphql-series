import { Resolver, Mutation, Arg } from "type-graphql";
import bcrypt from 'bcryptjs';

import { User } from '../entity/User';
import { RegisterInput } from "./user/register/registerInput";
import { sendEmail } from "../utils/sendEmail";
import { createConfirmEmailUrl } from "../utils/createConfirmEmailUrl";


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


    await sendEmail(email, await createConfirmEmailUrl(user.id));

    return user;

  }
}
