import { InputType, Field } from "type-graphql";
import { MaxLength, IsEmail, Length } from "class-validator";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";

@InputType()
export class RegisterInput {

    @Field()
    @MaxLength(50, {
        message: "Fist Name is too long. Maximal length is $constraint1 characters, but actual is $value"
    })
    firstName: string;

    @Field()
    @MaxLength(50, {
        message: "Last Name is too long. Maximal length is $constraint1 characters, but actual is $value"
    })
    lastName: string;

    @Field()
    @MaxLength(50, {
        message: "Email is too long. Maximal length is $constraint1 characters, but actual is $value"
    })
    @IsEmail()
    @IsEmailAlreadyExist({ message: "Email is already in use" })
    email: string;


    @Field()
    @Length(5, 50)
    password: string;
}