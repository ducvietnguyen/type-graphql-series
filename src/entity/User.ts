import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";



@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    lastName: string;

    @Column("text", {unique:true})
    @Field()   
    email: string;


    @Column()
    password: string;

    @Column("bool", {default: false})
    @Field()
    isConfirmedEmail: boolean;

    //custom properties
    @Field()
    name(@Root() parent: User): string{
        return `${parent.firstName} ${parent.lastName}`;
    };    

}
